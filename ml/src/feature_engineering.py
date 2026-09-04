import json
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

def build_features(input_path="data/interim/claims_clean.csv", output_path="data/processed/claims_features.csv", pipeline_path="artifacts/preprocessor.joblib", config_path="configs/features.json"):
    with open(config_path, "r") as f:
        config = json.load(f)
        
    df = pd.read_csv(input_path)
    
    df["area_diff_pct"] = np.abs(df["claimed_area"] - df["gis_area"]) / df["claimed_area"] * 100.0
    
    numeric_features = config["numeric_features"]
    categorical_features = config["categorical_features"]
    target = config["target"]
    
    num_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    
    cat_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", num_pipeline, numeric_features),
            ("cat", cat_pipeline, categorical_features)
        ]
    )
    
    X = df[numeric_features + categorical_features]
    y = df[target]
    
    X_transformed = preprocessor.fit_transform(X)
    
    num_cols = numeric_features
    cat_cols = preprocessor.named_transformers_["cat"].named_steps["encoder"].get_feature_names_out(categorical_features).tolist()
    all_cols = num_cols + cat_cols
    
    processed_df = pd.DataFrame(X_transformed, columns=all_cols)
    processed_df["claim_id"] = df["claim_id"].values
    processed_df[target] = y.values
    
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(pipeline_path).parent.mkdir(parents=True, exist_ok=True)
    
    processed_df.to_csv(output_path, index=False)
    joblib.dump(preprocessor, pipeline_path)

if __name__ == "__main__":
    build_features()