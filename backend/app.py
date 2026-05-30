from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import time

app = Flask(__name__)
# CORS diaktifkan agar frontend React bisa memanggil API ini
CORS(app)

@app.route('/', methods=['GET'])
def health_check():
    return "Backend Rebalytix Aktif dan Siap Menerima Prediksi!", 200

# --- LOAD MODEL MACHINE LEARNING ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RF_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'random_forest_model.pkl')
XGB_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'xgboost_best_model.pkl')

rf_model = None
xgb_model = None

try:
    rf_model = joblib.load(RF_MODEL_PATH)
    xgb_model = joblib.load(XGB_MODEL_PATH)
    print("✅ Model Machine Learning berhasil dimuat menggunakan joblib!")
except Exception as e:
    print(f"⚠️ Peringatan: Gagal memuat model. Error: {e}")

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
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
        # 1. PROSES ENCODING KETAT (Mendeteksi Drop/Batas Bawah)
        # =====================================================================
        hb_enc = 1
        if gender == 'Laki-laki':
            if 13 <= hb <= 17: hb_enc = 1
            elif 11 <= hb < 13: hb_enc = 2
            else: hb_enc = 4
        else:
            if 12 <= hb <= 15: hb_enc = 1
            elif 11 <= hb < 12: hb_enc = 2
            else: hb_enc = 4

        chol_enc = 1 if cholesterol < 200 else (2 if 200 <= cholesterol < 240 else 3)
        
        bmi_enc = 1
        if 18.5 <= bmi < 25: bmi_enc = 1
        elif 25 <= bmi < 30: bmi_enc = 2
        else: bmi_enc = 3 

        ureum_enc = 1 if 15 <= ureum <= 50 else 4
        creat_enc = 1 if 0.6 <= creatinine <= 1.2 else 4

        gdp_enc = 1
        if 70 <= gdp <= 100: gdp_enc = 1
        elif 100 < gdp <= 125: gdp_enc = 2
        else: gdp_enc = 4 

        g2h_enc = 1 if g2h < 140 else (2 if 140 <= g2h < 200 else 4)

        bp_enc = 1
        if 90 <= bp <= 120: bp_enc = 1
        elif 120 < bp < 140: bp_enc = 2
        elif 140 <= bp < 160: bp_enc = 3
        else: bp_enc = 4 

        features = np.array([[hb_enc, chol_enc, bmi_enc, ureum_enc, creat_enc, gdp_enc, g2h_enc, bp_enc]])

        # =====================================================================
        # 2. PREDIKSI ML & CLINICAL OVERRIDE
        # =====================================================================
        if rf_model and xgb_model:
            rf_prob = rf_model.predict_proba(features)[0][1]
            xgb_prob = xgb_model.predict_proba(features)[0][1]
            risk_score = ((rf_prob + xgb_prob) / 2) * 100
        else:
            raise Exception("Model ML belum siap.")

        is_high_risk = risk_score >= 50
        prediction_status = "Risiko Tinggi" if is_high_risk else "Risiko Rendah"

        # CLINICAL OVERRIDE (Intervensi paksa jika ada angka sangat fatal)
        fatal_flags = []
        if hb < 8: fatal_flags.append("Anemia Berat (Hb < 8)")
        if creatinine > 1.5: fatal_flags.append("Kreatinin Tinggi")
        if ureum > 70: fatal_flags.append("Ureum Tinggi")
        
        if not is_high_risk and len(fatal_flags) > 0:
            is_high_risk = True 
            prediction_status = "Risiko Tinggi (Clinical Override)"
            risk_score = max(risk_score, 85.0)

        # =====================================================================
        # 3. LOGIKA REKOMENDASI KLINIS DINAMIS (Deteksi Kurang / Lebih)
        # =====================================================================
        rekomendasi = []

        hb_min = 13 if gender == 'Laki-laki' else 12
        hb_max = 17 if gender == 'Laki-laki' else 15
        if hb < hb_min: 
            rekomendasi.append(f"⚠️ Waspada Anemia: Kadar Hemoglobin ({hb} g/dL) di bawah normal. Perbanyak konsumsi makanan kaya zat besi seperti sayuran hijau, hati, daging merah, dan Vitamin C untuk membantu pembentukan sel darah.")
        elif hb > hb_max:
            rekomendasi.append(f"⚠️ Kadar Hemoglobin ({hb} g/dL) terpantau di atas normal. Pastikan tubuh tetap terhidrasi dengan baik dan hindari dehidrasi.")

        if cholesterol >= 200:
            rekomendasi.append(f"⚠️ Kolesterol Tinggi: Kadar Anda ({cholesterol} mg/dL) melebihi batas sehat. Hindari gorengan dan lemak jenuh karena plak kolesterol memperburuk aliran darah ke ginjal.")

        if bmi < 18.5: 
            rekomendasi.append(f"⚠️ Waspada Underweight: Indeks Massa Tubuh ({bmi}) di bawah normal. Tingkatkan asupan kalori bernutrisi tinggi dan protein untuk mencapai berat badan ideal yang mendukung metabolisme tubuh.")
        elif bmi >= 25:
            rekomendasi.append(f"⚠️ Overweight/Obesitas: Indeks Massa Tubuh ({bmi}) berlebih. Lakukan aktivitas fisik rutin minimal 30 menit sehari untuk meringankan kerja ginjal.")
            
        if bp < 90:
            rekomendasi.append(f"⚠️ Waspada Hipotensi: Tekanan darah Anda ({bp} mmHg) terlalu rendah. Pastikan asupan cairan harian cukup dan jangan mengubah posisi tubuh secara mendadak.")
        elif bp > 120: 
            rekomendasi.append(f"⚠️ Peringatan Hipertensi: Tekanan darah ({bp} mmHg) di atas batas wajar. Segera kurangi makanan tinggi garam/natrium dan kelola stres.")

        if ureum < 15:
            rekomendasi.append(f"⚠️ Ureum Rendah: Kadar ({ureum} mg/dL) di bawah target. Ini biasanya terkait dengan diet yang terlalu rendah protein. Pastikan asupan protein sehat harian Anda tercukupi.")
        elif ureum > 50: 
            rekomendasi.append(f"⚠️ Ureum Tinggi: Terdapat penumpukan limbah nitrogen. Jaga asupan air putih yang cukup dan batasi protein berlebih tanpa pengawasan dokter.")

        if creatinine < 0.6:
            rekomendasi.append(f"⚠️ Kreatinin Rendah: Angka ({creatinine} mg/dL) di bawah normal. Hal ini sering disebabkan oleh massa otot yang rendah atau malnutrisi. Pertimbangkan olahraga ringan untuk otot dan nutrisi seimbang.")
        elif creatinine > 1.2: 
            rekomendasi.append(f"⚠️ Peringatan Kritis: Kreatinin ({creatinine} mg/dL) tinggi. Ini adalah indikator utama penurunan fungsi saringan ginjal. Hindari jamu-jamuan atau obat pereda nyeri tanpa resep dokter.")
        else:
            if not is_high_risk and (15 <= ureum <= 50):
                rekomendasi.append("✅ Fungsi penyaringan utama ginjal (Kreatinin & Ureum) Anda terpantau dalam batas wajar. Pertahankan kebiasaan minum air putih yang baik.")

        if gdp < 70:
            rekomendasi.append(f"⚠️ Waspada Hipoglikemia: Gula darah puasa ({gdp} mg/dL) sangat rendah/drop. Jangan melewatkan waktu makan dan segera konsumsi karbohidrat cepat serap jika merasa lemas.")
        elif gdp > 100:
            rekomendasi.append(f"⚠️ Indikasi Prediabetes/Diabetes: Gula darah puasa ({gdp} mg/dL) tinggi. Fluktuasi gula darah berlebih akan merusak pembuluh darah mikro di dalam ginjal.")

        if g2h >= 140:
            rekomendasi.append(f"⚠️ Toleransi Glukosa Terganggu: Gula 2 jam PP ({g2h} mg/dL) di atas batas normal. Batasi konsumsi gula tambahan dan makanan indeks glikemik tinggi.")

        rekomendasi.append("Penting: Segera konsultasikan hasil skrining AI ini dengan dokter spesialis untuk evaluasi kondisi medis Anda secara sah dan menyeluruh.")
        
        # =====================================================================
        # 4. PENYUSUNAN EXPLANATION (Kesimpulan untuk Frontend)
        # =====================================================================
        explanation = (
            f"Berdasarkan analisis AI dan Pengecekan Klinis, Pasien {name} terdeteksi memiliki Risiko Tinggi. "
            f"Faktor kritis: {', '.join(fatal_flags) if fatal_flags else 'Kalkulasi Multi-parameter ML'}."
        ) if is_high_risk else (
            f"Hasil analisis sistem menunjukkan Pasien {name} berada pada Risiko Rendah. "
            "Parameter fungsi ginjal Anda secara umum masih terjaga dengan baik."
        )

        time.sleep(0.8)

        return jsonify({
            "status": "success",
            "prediction": prediction_status,
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