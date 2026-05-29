import pandas as pd
import joblib
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.model_selection import train_test_split

print("Memulai evaluasi model...\n")

# Load dataset hasil olah
df = pd.read_excel('dataset/Dataset_Hasil_OlahData.xlsx')

# Filter 8 fitur esensial
fitur_esensial = ['Hb', 'Chol', 'BMI', 'Ureum', 'Creat', 'GDP', 'G2H', 'BP']
X = df[fitur_esensial].copy()

# Fix format desimal & standardisasi tipe numerik
X = X.replace({',': '.'}, regex=True).apply(pd.to_numeric, errors='coerce')

# Binarisasi target probabilitas (>=75% -> 1, sisanya -> 0)
y = df['Prob Dec 2'].map({'100%': 1, '75%': 1, '50%': 0, '25%': 0}).fillna(0)

# Split dataset 80:20
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Load pre-trained XGBoost
print("[*] Memuat model XGBoost...")
model = joblib.load('models/xgboost_best_model.pkl')

# Eksekusi prediksi
print("[*] Melakukan prediksi...")
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

# Print evaluasi performa
print("\n" + "="*45)
print("======== EVALUASI PERFORMA MODEL ========")
print("="*45)
print(classification_report(y_test, y_pred))

auc = roc_auc_score(y_test, y_pred_proba)
print(f"AUC-ROC Score: {auc:.4f}")
print("="*45 + "\n")