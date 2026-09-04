import joblib
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, precision_recall_curve, auc

def evaluate_model(features_path="data/processed/claims_features.csv", model_path="models/model_v1.joblib"):
    df = pd.read_csv(features_path)
    
    drop_cols = ["claim_id", "is_anomaly"]
    feature_cols = [c for c in df.columns if c not in drop_cols]
    
    X = df[feature_cols].values
    y = df["is_anomaly"].values
    
    model = joblib.load(model_path)
    preds_proba = model.predict_proba(X)[:, 1]
    preds_binary = (preds_proba >= 0.50).astype(int)
    
    roc_auc = roc_auc_score(y, preds_proba)
    precision, recall, _ = precision_recall_curve(y, preds_proba)
    pr_auc = auc(recall, precision)
    
    cm = confusion_matrix(y, preds_binary)
    report = classification_report(y, preds_binary, output_dict=True)
    
    print("=== MODEL EVALUATION METRICS ===")
    print(f"ROC-AUC: {round(roc_auc, 4)}")
    print(f"PR-AUC:  {round(pr_auc, 4)}")
    print(f"Confusion Matrix:\nTN: {cm[0][0]} | FP: {cm[0][1]}\nFN: {cm[1][0]} | TP: {cm[1][1]}")
    print(f"Precision (Class 1): {round(report['1']['precision'], 4)}")
    print(f"Recall (Class 1):    {round(report['1']['recall'], 4)}")
    print(f"F1-Score (Class 1):  {round(report['1']['f1-score'], 4)}")

if __name__ == "__main__":
    evaluate_model()