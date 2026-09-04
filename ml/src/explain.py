import json
import joblib
import numpy as np

class ModelExplainer:
    def __init__(self, model_path="models/model_v1.joblib", metrics_path="artifacts/metrics.json"):
        self.model = joblib.load(model_path)
        with open(metrics_path, "r") as f:
            metrics = json.load(f)
        self.feature_names = metrics["feature_names"]

    def explain_instance(self, processed_features_array, top_k=3):
        importances = self.model.feature_importances_
        abs_weights = np.abs(processed_features_array[0]) * importances
        
        feature_impact = dict(zip(self.feature_names, abs_weights))
        sorted_factors = sorted(feature_impact.items(), key=lambda x: x[1], reverse=True)
        
        top_risk_factors = [
            {"factor": factor, "contribution": round(float(val), 4)}
            for factor, val in sorted_factors[:top_k] if val > 0
        ]
        return top_risk_factors