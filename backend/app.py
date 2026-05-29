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
        # Menyesuaikan matriks bobot data latih
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
        # Urutan: Hb, Chol, BMI, Ureum, Creat, GDP, G2H, BP
        # =====================================================================
        features = np.array([[hb_enc, chol_enc, bmi_enc, ureum_enc, creat_enc, gdp_enc, g2h_enc, bp_enc]])

        # 3. Prediksi menggunakan Model Asli (Ensemble)
        if rf_model and xgb_model:
            # Mengambil probabilitas dari kelas target indeks ke-[1]
            rf_prob = rf_model.predict_proba(features)[0][1]
            xgb_prob = xgb_model.predict_proba(features)[0][1]
            
            # Penggabungan keputusan komputasi via Soft Voting Ensemble
            ensemble_prob = (rf_prob + xgb_prob) / 2
            risk_score = ensemble_prob * 100
        else:
            raise Exception("Model Machine Learning belum siap atau tidak ditemukan di server.")

        # Ambang batas fungsional penentuan keputusan klaster (50%)
        is_high_risk = risk_score >= 50

       # =====================================================================
        # LOGIKA REKOMENDASI KLINIS DINAMIS (Deteksi Kurang / Lebih)
        # =====================================================================
        rekomendasi = []

        # 1. Cek Hemoglobin (Batas Bawah & Atas)
        hb_min = 13 if gender == 'Laki-laki' else 12
        hb_max = 17 if gender == 'Laki-laki' else 15
        if hb < hb_min: 
            rekomendasi.append(f"⚠️ Waspada Anemia: Kadar Hemoglobin ({hb} g/dL) di bawah normal. Perbanyak konsumsi makanan kaya zat besi seperti sayuran hijau, hati, daging merah, dan Vitamin C untuk membantu pembentukan sel darah.")
        elif hb > hb_max:
            rekomendasi.append(f"⚠️ Kadar Hemoglobin ({hb} g/dL) terpantau di atas normal. Pastikan tubuh tetap terhidrasi dengan baik dan hindari dehidrasi.")

        # 2. Cek Kolesterol
        if cholesterol >= 200:
            rekomendasi.append(f"⚠️ Kolesterol Tinggi: Kadar Anda ({cholesterol} mg/dL) melebihi batas sehat. Hindari gorengan dan lemak jenuh karena plak kolesterol memperburuk aliran darah ke ginjal.")

        # 3. Cek Berat Badan (BMI)
        if bmi < 18.5: 
            rekomendasi.append(f"⚠️ Waspada Underweight: Indeks Massa Tubuh ({bmi}) di bawah normal. Tingkatkan asupan kalori bernutrisi tinggi dan protein untuk mencapai berat badan ideal yang mendukung metabolisme tubuh.")
        elif bmi >= 25:
            rekomendasi.append(f"⚠️ Overweight/Obesitas: Indeks Massa Tubuh ({bmi}) berlebih. Lakukan aktivitas fisik rutin minimal 30 menit sehari untuk meringankan kerja ginjal.")
            
        # 4. Cek Tekanan Darah
        if bp < 90:
            rekomendasi.append(f"⚠️ Waspada Hipotensi: Tekanan darah Anda ({bp} mmHg) terlalu rendah. Pastikan asupan cairan harian cukup dan jangan mengubah posisi tubuh secara mendadak.")
        elif bp > 120: 
            rekomendasi.append(f"⚠️ Peringatan Hipertensi: Tekanan darah ({bp} mmHg) di atas batas wajar. Segera kurangi makanan tinggi garam/natrium dan kelola stres.")

        # 5. Cek Kadar Ureum
        if ureum < 15:
            rekomendasi.append(f"⚠️ Ureum Rendah: Kadar ({ureum} mg/dL) di bawah target. Ini biasanya terkait dengan diet yang terlalu rendah protein. Pastikan asupan protein sehat harian Anda tercukupi.")
        elif ureum > 50: 
            rekomendasi.append(f"⚠️ Ureum Tinggi: Terdapat penumpukan limbah nitrogen. Jaga asupan air putih yang cukup dan batasi protein berlebih tanpa pengawasan dokter.")

        # 6. Cek Kadar Kreatinin
        if creatinine < 0.6:
            rekomendasi.append(f"⚠️ Kreatinin Rendah: Angka ({creatinine} mg/dL) di bawah normal. Hal ini sering disebabkan oleh massa otot yang rendah atau malnutrisi. Pertimbangkan olahraga ringan untuk otot dan nutrisi seimbang.")
        elif creatinine > 1.2: 
            rekomendasi.append(f"⚠️ Peringatan Kritis: Kreatinin ({creatinine} mg/dL) tinggi. Ini adalah indikator utama penurunan fungsi saringan ginjal. Hindari jamu-jamuan atau obat pereda nyeri tanpa resep dokter.")
        else:
            # Pujian ginjal sehat hanya muncul jika Ureum & Kreatinin normal, DAN skor AI rendah
            if not is_high_risk and (15 <= ureum <= 50):
                rekomendasi.append("✅ Fungsi penyaringan utama ginjal (Kreatinin & Ureum) Anda terpantau dalam batas wajar. Pertahankan kebiasaan minum air putih yang baik.")

        # 7. Cek Gula Darah Puasa (GDP)
        if gdp < 70:
            rekomendasi.append(f"⚠️ Waspada Hipoglikemia: Gula darah puasa ({gdp} mg/dL) sangat rendah/drop. Jangan melewatkan waktu makan dan segera konsumsi karbohidrat cepat serap jika merasa lemas.")
        elif gdp > 100:
            rekomendasi.append(f"⚠️ Indikasi Prediabetes/Diabetes: Gula darah puasa ({gdp} mg/dL) tinggi. Fluktuasi gula darah berlebih akan merusak pembuluh darah mikro di dalam ginjal.")

        # 8. Cek Gula 2 Jam (G2H)
        if g2h >= 140:
            rekomendasi.append(f"⚠️ Toleransi Glukosa Terganggu: Gula 2 jam PP ({g2h} mg/dL) di atas batas normal. Batasi konsumsi gula tambahan dan makanan indeks glikemik tinggi.")

        # Menambahkan anjuran umum di poin paling bawah
        rekomendasi.append("Penting: Segera konsultasikan hasil skrining AI ini dengan dokter spesialis untuk evaluasi kondisi medis Anda secara sah dan menyeluruh.")
        # Simulasi jeda pemrosesan komputasi model
        time.sleep(0.8)

        return jsonify({
            "status": "success",
            "prediction": "Risiko Tinggi" if is_high_risk else "Risiko Rendah",
            "confidence": round(risk_score, 1),
            "explanation": explanation,
            "recommendations": rekomendasi
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    print("Backend Flask Rebalytix AI berjalan di http://127.0.0.1:5000")
    app.run(debug=True, port=5000)