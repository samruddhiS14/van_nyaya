class GroundedSummarizer:
    def __init__(self):
        pass

    def generate_summary(self, claim_data: dict, anomaly_result: dict) -> dict:
        claim_id = claim_data.get("claim_id", "N/A")
        claimed_area = claim_data.get("claimed_area", 0.0)
        gis_area = claim_data.get("gis_area", 0.0)
        risk_band = anomaly_result.get("risk_band", "UNKNOWN")
        prob = anomaly_result.get("anomaly_probability", 0.0)
        factors = anomaly_result.get("top_contributing_factors", [])
        
        factor_bullets = "\n".join([f"- {item['factor']} (impact weight: {item['contribution']})" for item in factors])

        structured_text = (
            f"CLAIM OVERVIEW\n"
            f"Claim Reference: {claim_id}\n"
            f"Claim Type: {claim_data.get('claim_type', 'IFR')}\n\n"
            f"KEY SPATIAL & RECORD FACTS\n"
            f"- Claimed Area: {claimed_area} ha\n"
            f"- Computed GIS Area: {gis_area} ha\n"
            f"- Land Boundary Overlap: {claim_data.get('overlap_pct', 0.0)}%\n"
            f"- Overlapping Claims Count: {claim_data.get('overlapping_claims_count', 0)}\n"
            f"- Survey Record Match: {claim_data.get('survey_number_matched', 'NO')}\n"
            f"- Missing Documents: {claim_data.get('missing_doc_count', 0)}\n\n"
            f"AI SCREENING ASSESSMENT\n"
            f"Risk Level: {risk_band} (Score: {prob})\n"
            f"Key Model Contributing Factors:\n{factor_bullets}\n\n"
            f"RECOMMENDATION FOR OFFICIAL\n"
            f"Review flagged spatial and identity discrepancies prior to statutory approval."
        )

        return {
            "claim_id": claim_id,
            "risk_band": risk_band,
            "summary_text": structured_text
        }