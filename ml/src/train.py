import json
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import roc_auc_score, precision_recall_curve, auc

def train_model(features_path="data/processed/claims_features.csv", model_output_path="models/model_v1.joblib", metrics_output_path="artifacts/metrics.json"):
    df = pd.read_csv(features_path)
    
    drop_cols = ["claim_id", "is_anomaly"]
    feature_cols = [c for c in df.columns if c not in drop_cols]
    
    X = df[feature_cols].values
    y = df["is_anomaly"].values
    
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    
    roc_scores = []
    pr_auc_scores = []
    
    for train_idx, val_idx in skf.split(X, y):
        X_train, X_val = X[train_idx], X[val_idx]
        y_train, y_val = y[train_idx], y[val_idx]
        
        clf = RandomForestClassifier(
            n_estimators=100,
            max_depth=5,
            class_weight="balanced",
            random_state=42
        )
        clf.fit(X_train, y_train)
        
        preds_proba = clf.predict_proba(X_val)[:, 1]
        roc_scores.append(roc_auc_score(y_val, preds_proba))
        
        precision, recall, _ = precision_recall_curve(y_val, preds_proba)
        pr_auc_scores.append(auc(recall, precision))
        
    final_model = RandomForestClassifier(
        n_estimators=100,
        max_depth=5,
        class_weight="balanced",
        random_state=42
    )
    final_model.fit(X, y)
    
    metrics = {
        "mean_cv_roc_auc": round(float(np.mean(roc_scores)), 4),
        "mean_cv_pr_auc": round(float(np.mean(pr_auc_scores)), 4),
        "total_samples": len(df),
        "anomaly_ratio": round(float(np.sum(y == 1) / len(df)), 4),
        "feature_names": feature_cols
    }
    
    Path(model_output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(metrics_output_path).parent.mkdir(parents=True, exist_ok=True)
    
    joblib.dump(final_model, model_output_path)
    with open(metrics_output_path, "w") as f:
        json.dump(metrics, f, indent=2)

if __name__ == "__main__":
    train_model()