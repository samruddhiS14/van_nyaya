import pandas as pd
from pathlib import Path

def clean_claims_data(input_path="data/raw/claims_raw.csv", output_path="data/interim/claims_clean.csv"):
    df = pd.read_csv(input_path)
    
    df = df.drop_duplicates(subset=["claim_id"])
    
    df["claimed_area"] = df["claimed_area"].clip(lower=0.01)
    df["gis_area"] = df["gis_area"].clip(lower=0.01)
    df["overlap_pct"] = df["overlap_pct"].clip(0.0, 100.0)
    df["name_similarity_score"] = df["name_similarity_score"].clip(0.0, 1.0)
    
    df["survey_number_matched"] = df["survey_number_matched"].fillna("NO").astype(str).str.upper()
    df["claim_type"] = df["claim_type"].fillna("IFR").astype(str).str.upper()
    
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

if __name__ == "__main__":
    clean_claims_data()