export type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ShapFactor {
  feature: string;
  importance: number;
  direction: 'positive' | 'negative';
  description: string;
}

export interface Claim {
  id: string;
  claimant_name: string;
  village: string;
  district: string;
  state: string;
  area_claimed_hectares: number;
  gis_computed_area_hectares: number;
  status: ClaimStatus;
  risk_score: number;
  risk_level: RiskLevel;
  pre_2005_verified: boolean;
  rejection_reason?: string;
  appeal_deadline?: string;
  coordinates: [number, number][];
  shap_attributions: ShapFactor[];
}
