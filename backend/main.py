from fastapi import FastAPI
import pickle
import numpy as np
from schemas.input_schema import LoanInput

app = FastAPI(
    title="Loan Default Prediction API",
    description="Optimized Random Forest Model Backend",
    version="1.0"
)

# Load model & scaler
model = pickle.load(open("model/best_rf.pkl", "rb"))
scaler = pickle.load(open("model/scaler.pkl", "rb"))

@app.get("/")
def root():
    return {"message": "Loan Default Prediction API is running"}



EXPECTED_FEATURES = [
    "Age","Income","LoanAmount","CreditScore","MonthsEmployed",
    "NumCreditLines","InterestRate","LoanTerm","DTIRatio",
    "Education","EmploymentType","MaritalStatus","HasMortgage",
    "HasDependents","LoanPurpose","HasCoSigner"
]

@app.post("/predict")
def predict(data: LoanInput):
    features = np.array(data.features).reshape(1, -1)

    if features.shape[1] != len(EXPECTED_FEATURES):
        return {
            "error": f"Expected {len(EXPECTED_FEATURES)} features in this order",
            "order": EXPECTED_FEATURES
        }

    features_scaled = scaler.transform(features)
    pred = model.predict(features_scaled)[0]
    prob = model.predict_proba(features_scaled)[0][1]

    return {
        "prediction": int(pred),
        "label": "Default" if pred == 1 else "Non-Default",
        "default_probability": round(float(prob), 4)
    }
