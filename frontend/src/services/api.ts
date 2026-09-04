import axios from 'axios';
import type { Claim } from '../types/claim';

const API_BASE_URL = 'http://127.0.0.1:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getClaims = async (): Promise<Claim[]> => {
  const localSaved = localStorage.getItem('van_nyaya_claims');
  const userIngested: Claim[] = localSaved ? JSON.parse(localSaved) : [];

  try {
    const response = await apiClient.get('/claims');
    return [...userIngested, ...response.data];
  } catch (error) {
    const defaultData: Claim[] = [
      {
        id: 'FRA-1023',
        claimant_name: 'Mangilal Bhil',
        village: 'Kothri Kalan',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        area_claimed_hectares: 10.2,
        gis_computed_area_hectares: 6.1,
        status: 'PENDING',
        risk_score: 0.78,
        risk_level: 'HIGH',
        pre_2005_verified: false,
        coordinates: [
          [23.120, 76.980],
          [23.126, 76.980],
          [23.126, 76.987],
          [23.120, 76.987],
        ],
        shap_attributions: [
          { feature: 'pre_2005_satellite_anomaly', importance: 0.44, direction: 'positive', description: 'No cultivation clearing detected in Landsat archive prior to Dec 13, 2005' },
          { feature: 'area_discrepancy_pct', importance: 0.67, direction: 'positive', description: 'GIS cadastral boundary differs from claimed form area by 67%' },
        ],
      },
      {
        id: 'FRA-1041',
        claimant_name: 'Devkaran Korku',
        village: 'Nimawar',
        district: 'Dewas',
        state: 'Madhya Pradesh',
        area_claimed_hectares: 5.1,
        gis_computed_area_hectares: 5.2,
        status: 'PENDING',
        risk_score: 0.45,
        risk_level: 'MEDIUM',
        pre_2005_verified: true,
        coordinates: [
          [23.130, 76.990],
          [23.135, 76.990],
          [23.135, 76.995],
          [23.130, 76.995],
        ],
        shap_attributions: [
          { feature: 'delay_in_sdlc', importance: 0.28, direction: 'positive', description: 'Processing window exceeded statutory timeline' },
        ],
      },
      {
        id: 'FRA-1067',
        claimant_name: 'Savitri Bai Gond',
        village: 'Khategaon',
        district: 'Dewas',
        state: 'Madhya Pradesh',
        area_claimed_hectares: 8.0,
        gis_computed_area_hectares: 7.95,
        status: 'APPROVED',
        risk_score: 0.08,
        risk_level: 'LOW',
        pre_2005_verified: true,
        coordinates: [
          [23.140, 76.980],
          [23.145, 76.980],
          [23.145, 76.985],
          [23.140, 76.985],
        ],
        shap_attributions: [
          { feature: 'pre_2005_satellite_anomaly', importance: 0.02, direction: 'negative', description: 'Uninterrupted pre-2005 occupancy verified' },
        ],
      },
      {
        id: 'FRA-1099',
        claimant_name: 'Rameshwar Kol',
        village: 'Ashta',
        district: 'Sehore',
        state: 'Madhya Pradesh',
        area_claimed_hectares: 3.8,
        gis_computed_area_hectares: 2.1,
        status: 'REJECTED',
        risk_score: 0.91,
        risk_level: 'HIGH',
        pre_2005_verified: false,
        coordinates: [
          [23.110, 76.970],
          [23.115, 76.970],
          [23.115, 76.975],
          [23.110, 76.975],
        ],
        shap_attributions: [
          { feature: 'reserve_forest_overlap', importance: 0.62, direction: 'positive', description: 'Boundary overlaps with protected sanctuary core' },
        ],
      }
    ];

    return [...userIngested, ...defaultData];
  }
};
