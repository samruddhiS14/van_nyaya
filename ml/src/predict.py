import json
import joblib
import pandas as pd
from src.explain import ModelExplainer

class FRAAnomalyPredictor:
    def __init__(
        self,
        model_path="models/model_v1.joblib",
        preprocessor_path="artifacts/preprocessor.joblib",
        config_path="configs/features.json"
    ):
        self.model = joblib.load(model_path)
        self.preprocessor = joblib.load(preprocessor_path)
        with open(config_path, "r") as f:
            self.config = json.load(f)
        self.explainer = ModelExplainer()

    def predict_claim(self, claim_data: dict) -> dict:
        claimed_area = float(claim_data["claimed_area"])
        gis_area = float(claim_data["gis_area"])
        area_diff_pct = abs(claimed_area - gis_area) / max(claimed_area, 0.01) * 100.0

        raw_df = pd.DataFrame([{
            "claimed_area": claimed_area,
            "gis_area": gis_area,
            "area_diff_pct": area_diff_pct,
            "overlap_pct": float(claim_data["overlap_pct"]),
            "overlapping_claims_count": int(claim_data["overlapping_claims_count"]),
            "name_similarity_score": float(claim_data["name_similarity_score"]),
            "survey_number_matched": str(claim_data.get("survey_number_matched", "NO")).upper(),
            "missing_doc_count": int(claim_data["missing_doc_count"]),
            "historical_claim_count": int(claim_data["historical_claim_count"]),
            "claim_type": str(claim_data.get("claim_type", "IFR")).upper()
        }])

        X_proc = self.preprocessor.transform(raw_df)
        prob = float(self.model.predict_proba(X_proc)[0, 1])

        if prob >= 0.65:
            risk_band = "HIGH"
        elif prob >= 0.35:
            risk_band = "MEDIUM"
        else:
            risk_band = "LOW"

        top_factors = self.explainer.explain_instance(X_proc, top_k=3)

        return {
            "claim_id": claim_data.get("claim_id", "UNKNOWN"),
            "anomaly_probability": round(prob, 4),
            "risk_band": risk_band,
            "is_flagged": prob >= 0.50,
            "top_contributing_factors": top_factors
        }

if __name__ == "__main__":
    predictor = FRAAnomalyPredictor()
    sample = {
        "claim_id": "FRA_10999",
        "claim_type": "IFR",
        "claimed_area": 3.5,
        "gis_area": 1.2,
        "overlap_pct": 65.4,
        "overlapping_claims_count": 3,
        "name_similarity_score": 0.45,
        "survey_number_matched": "NO",
        "missing_doc_count": 2,
        "historical_claim_count": 3
    }
    print(json.dumps(predictor.predict_claim(sample), indent=2))