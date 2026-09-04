from app.database.connection import SessionLocal
from app.models.claim import Claim

def seed_demo_claims():
    db = SessionLocal()
    if db.query(Claim).count() > 0:
        db.close()
        return

    sample_claims = [
        Claim(
            claim_id="FRA-2026-MP-001",
            claimant_id="CL-8801",
            claimant_name="Devji Bhai Bhil",
            claim_type="IFR",
            village_id="VIL-Khargone-12",
            gram_panchayat_id="GP-Khargone-04",
            district_id="Khargone",
            survey_number="SY-412/A",
            claimed_area=3.8,
            gis_area=1.4,
            overlap_pct=52.4,
            overlapping_claims_count=2,
            status="PENDING_REVIEW"
        ),
        Claim(
            claim_id="FRA-2026-MP-002",
            claimant_id="CL-8802",
            claimant_name="Mangilal Gond",
            claim_type="IFR",
            village_id="VIL-Betul-08",
            gram_panchayat_id="GP-Betul-02",
            district_id="Betul",
            survey_number="SY-109/B",
            claimed_area=1.8,
            gis_area=1.75,
            overlap_pct=0.0,
            overlapping_claims_count=0,
            status="APPROVED"
        ),
        Claim(
            claim_id="FRA-2026-MP-003",
            claimant_id="CL-8803",
            claimant_name="Suraj Bai Korku",
            claim_type="CR",
            village_id="VIL-Hoshangabad-21",
            gram_panchayat_id="GP-Hoshangabad-07",
            district_id="Hoshangabad",
            survey_number="SY-981",
            claimed_area=4.5,
            gis_area=3.2,
            overlap_pct=18.6,
            overlapping_claims_count=1,
            status="PENDING_REVIEW"
        )
    ]
    db.add_all(sample_claims)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed_demo_claims()