from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import time

app = Flask(__name__)
# CORS diaktifkan agar frontend React bisa memanggil API ini
CORS(app)

# --- LOAD MODEL MACHINE LEARNING ---
# Menentukan path absolut ke folder models
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RF_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'random_forest_model.pkl')
XGB_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'xgboost_best_model.pkl')

rf_model = None
xgb_model = None

try:
    # Menggunakan joblib.load untuk membaca file model asli 
    rf_model = joblib.load(RF_MODEL_PATH)
    xgb_model = joblib.load(XGB_MODEL_PATH)
    print("✅ Model Machine Learning berhasil dimuat menggunakan joblib!")
except Exception as e:
    print(f"⚠️ Peringatan: Gagal memuat model. Pastikan file .pkl ada di folder 'models'. Error: {e}")

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Mengambil data asli (numerical float) dari frontend
        name = data.get('name', 'Pasien')
        age = float(data.get('age', 0))
        gender = data.get('gender', 'Laki-laki')
        hb = float(data.get('hb', 0))
        cholesterol = float(data.get('cholesterol', 0))
        bmi = float(data.get('bmi', 0))
        bp = float(data.get('bp', 0))
        ureum = float(data.get('ureum', 0))
        creatinine = float(data.get('creatinine', 0))
        gdp = float(data.get('gdp', 0))
        g2h = float(data.get('g2h', 0))

        # =====================================================================
        # PROSES ENCODING: Menerjemahkan angka riil menjadi Kategori (1, 2, 3, 4)
        # =====================================================================

        # 1. Encoding Hb (Hemoglobin) -> Normal=1, Ringan=2, Sedang=3, Berat=4
        hb_enc = 1
        if gender == 'Laki-laki':
            if hb >= 13: hb_enc = 1
            elif 11 <= hb < 13: hb_enc = 2
            elif 8 <= hb < 11: hb_enc = 3
            else: hb_enc = 4
        else:  # Perempuan
            if hb >= 12: hb_enc = 1
            elif 11 <= hb < 12: hb_enc = 2
            elif 8 <= hb < 11: hb_enc = 3
            else: hb_enc = 4

        # 2. Encoding Cholesterol -> Normal=1, Borderline=2, Tinggi=3
        chol_enc = 1
        if cholesterol < 200: chol_enc = 1
        elif 200 <= cholesterol < 240: chol_enc = 2
        else: chol_enc = 3

        # 3. Encoding BMI -> Normal=1, Overweight=2, Obesitas=3
        bmi_enc = 1
        if bmi < 25: bmi_enc = 1
        elif 25 <= bmi < 30: bmi_enc = 2
        else: bmi_enc = 3

        # 4. Encoding Ureum -> Normal=1, Tinggi=4
        ureum_enc = 1 if ureum <= 50 else 4

        # 5. Encoding Creatinine -> Normal=1, Tinggi=4
        creat_enc = 1 if creatinine <= 1.2 else 4

        # 6. Encoding GDP (Gula Darah Puasa) -> Normal=1, Prediabetes=2, Diabetes=4
        gdp_enc = 1
        if gdp <= 100: gdp_enc = 1
        elif 100 < gdp <= 125: gdp_enc = 2
        else: gdp_enc = 4

        # 7. Encoding G2H (Gula 2 Jam) -> Normal=1, Prediabetes=2, Diabetes=4
        g2h_enc = 1
        if g2h <= 140: g2h_enc = 1
        elif 140 < g2h < 200: g2h_enc = 2
        else: g2h_enc = 4

        # 8. Encoding BP (Blood Pressure) -> Normal=1, Prehipertensi=2, HT1=3, HT2=4
        bp_enc = 1
        if bp <= 120: bp_enc = 1
        elif 120 < bp < 140: bp_enc = 2
        elif 140 <= bp < 160: bp_enc = 3
        else: bp_enc = 4

        # =====================================================================
        # ARTIKULASI MATRIKS FITUR INPUT MODEL (Tepat 8 Kolom Kategori)
        # =====================================================================
        features = np.array([[hb_enc, chol_enc, bmi_enc, ureum_enc, creat_enc, gdp_enc, g2h_enc, bp_enc]])

        # 3. Prediksi menggunakan Model Asli (Ensemble)
        if rf_model and xgb_model:
            rf_prob = rf_model.predict_proba(features)[0][1]
            xgb_prob = xgb_model.predict_proba(features)[0][1]
            
            ensemble_prob = (rf_prob + xgb_prob) / 2
            risk_score = ensemble_prob * 100
        else:
            raise Exception("Model Machine Learning belum siap.")

        # --- PERBAIKAN LOGIKA: Bulatkan skor SEBELUM pengecekan risiko ---
        risk_score = round(risk_score, 1)
        is_high_risk = risk_score >= 50

        # --- LOGIKA REKOMENDASI KLINIS DINAMIS ---
        rekomendasi = []
        if hb_enc > 1: rekomendasi.append("Kadar Hemoglobin (Hb) rendah.")
        if chol_enc > 1: rekomendasi.append("Kadar Kolesterol melebihi batas sehat.")
        if bmi_enc > 1: rekomendasi.append("Indeks Massa Tubuh (BMI) menunjukkan berat badan berlebih.")
        if bp_enc > 1: rekomendasi.append("Tekanan darah Anda tinggi (indikasi Hipertensi).")
        if ureum_enc > 1: rekomendasi.append("Kadar Ureum di atas normal.")
        if creat_enc > 1: rekomendasi.append("Kadar Kreatinin Anda tinggi.")
        else: rekomendasi.append("Fungsi penyaringan utama ginjal (Kreatinin) Anda normal.")
        if gdp_enc > 1 or g2h_enc > 1: rekomendasi.append("Indikasi prediabetes/diabetes.")
        rekomendasi.append("Penting: Segera konsultasikan dengan dokter.")

        explanation = (
            f"Berdasarkan analisis Hybrid Ensemble Machine Learning, Pasien {name} terdeteksi memiliki Risiko Tinggi gagal ginjal kronis."
            if is_high_risk else 
            f"Hasil analisis sistem menunjukkan Pasien {name} berada pada Risiko Rendah."
        )

        time.sleep(0.8)

        # Kirim response tanpa pembulatan ganda lagi
        return jsonify({
            "status": "success",
            "prediction": "Risiko Tinggi" if is_high_risk else "Risiko Rendah",
            "confidence": risk_score,
            "explanation": explanation,
            "recommendations": rekomendasi
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)