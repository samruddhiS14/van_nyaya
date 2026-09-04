import numpy as np
import pandas as pd
from pathlib import Path

def generate_synthetic_data(num_samples=1000, output_path="data/raw/claims_raw.csv"):
    np.random.seed(42)
    
    claim_ids = [f"FRA_{10000 + i}" for i in range(num_samples)]
    claimant_ids = [f"CLM_{np.random.randint(100, 700)}" for _ in range(num_samples)]
    claim_types = np.random.choice(["IFR", "CFR"], size=num_samples, p=[0.75, 0.25])
    
    is_anomaly = np.random.choice([0, 1], size=num_samples, p=[0.88, 0.12])
    
    claimed_area = np.random.uniform(0.5, 4.0, size=num_samples)
    
    gis_area = []
    overlap_pct = []
    overlapping_claims_count = []
    name_similarity_score = []
    survey_number_matched = []
    missing_doc_count = []
    historical_claim_count = []
    
    for i in range(num_samples):
        if is_anomaly[i] == 1:
            gis_factor = np.random.choice([0.4, 1.8, 2.5])
            calc_gis_area = claimed_area[i] * gis_factor
            calc_overlap = np.random.uniform(35.0, 95.0)
            calc_overlap_count = np.random.choice([2, 3, 4])
            calc_sim_score = np.random.uniform(0.3, 0.7)
            calc_survey_match = np.random.choice(["NO", "YES"], p=[0.7, 0.3])
            calc_missing_docs = np.random.choice([1, 2, 3])
            calc_hist_count = np.random.choice([2, 3, 5])
        else:
            calc_gis_area = claimed_area[i] * np.random.uniform(0.95, 1.05)
            calc_overlap = np.random.uniform(0.0, 10.0)
            calc_overlap_count = np.random.choice([0, 1], p=[0.9, 0.1])
            calc_sim_score = np.random.uniform(0.85, 1.0)
            calc_survey_match = "YES"
            calc_missing_docs = 0
            calc_hist_count = np.random.choice([0, 1], p=[0.85, 0.15])
            
        gis_area.append(calc_gis_area)
        overlap_pct.append(calc_overlap)
        overlapping_claims_count.append(calc_overlap_count)
        name_similarity_score.append(calc_sim_score)
        survey_number_matched.append(calc_survey_match)
        missing_doc_count.append(calc_missing_docs)
        historical_claim_count.append(calc_hist_count)
        
    df = pd.DataFrame({
        "claim_id": claim_ids,
        "claimant_id": claimant_ids,
        "claim_type": claim_types,
        "claimed_area": np.round(claimed_area, 2),
        "gis_area": np.round(gis_area, 2),
        "overlap_pct": np.round(overlap_pct, 2),
        "overlapping_claims_count": overlapping_claims_count,
        "name_similarity_score": np.round(name_similarity_score, 2),
        "survey_number_matched": survey_number_matched,
        "missing_doc_count": missing_doc_count,
        "historical_claim_count": historical_claim_count,
        "is_anomaly": is_anomaly
    })
    
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(output_path, index=False)

if __name__ == "__main__":
    generate_synthetic_data()