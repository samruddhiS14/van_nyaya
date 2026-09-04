# Van-Nyaya (वन न्याय) — Judge Pitch & Demo Playbook

## 1. The Core Problem (The "Hook" — 30 Seconds)
"Under the Forest Rights Act (FRA, 2006), over 50% of tribal land claims are historically rejected without transparent legal justification. Claimants face arbitrary administrative dismissals, manual cadastral survey delays, and no objective way to prove possession prior to the statutory cutoff date of December 13, 2005.

Van-Nyaya solves this with an AI-powered geospatial decision support system combining pre-2005 satellite archival radar, real-time cadastral boundary triangulation, and explainable AI risk scoring."

---

## 2. The 3 Technical Differentiators (60 Seconds)
1. **Pre-2005 Temporal Landsat Telemetry**: We cross-reference claim boundaries against USGS Landsat-7 surface reflectance imagery taken before December 13, 2005 to archivally substantiate multi-generational occupancy vs. modern encroachment.
2. **Statutory 90-Day Appeal Desk**: Eliminates silent rejections. Every rejection requires specific legal clauses, generates a formal legal notice, and activates an automated 90-day statutory appeal countdown.
3. **Transparent Explainable AI (SHAP)**: Rather than an unexplainable 'black box', our Random Forest model decomposes risk into exact feature attribution percentages (e.g. area mismatch, temporal canopy deficit) to guide district officers.

---

## 3. The 2-Minute Live Demo Flow

### Step A: The Citizen Portal & Claim Intake
1. Show the **Landing Page**: point out the deep forest green telemetry section and the light sage/pista green action portal.
2. Click **Check Status**: Enter `FRA-1023` to show multi-tier statutory verification progress (Gram Sabha -> SDLC -> DLC).
3. Click **Apply for FRA**: Click the **Auto-Fill Demo** button (or drag-and-drop `sample_data/valid_claim_dewas.geojson`) and hit **Submit Claim**.
4. Point out: *"The polygon geometry was ingested live into our FastAPI backend and evaluated by our Random Forest model in milliseconds."*

### Step B: The Officer Command Center
1. Click **Launch Dashboard**.
2. **WebGIS Telemetry**: Show the polygon on the Leaflet radar. Click **Toggle Pre-2005 Archival** to show the Landsat NIR layer comparison over the plot.
3. **Explainable AI (SHAP)**: Select a claim (e.g., `FRA-1023` or `FRA-1099`). Point to the **SHAP Risk Drivers** (+67% area discrepancy, +44% pre-2005 anomaly).
4. **Legal Enforcement**: 
   - Click **Reject Order** -> Show the Rule 12(2) Statutory Rejection Order with the **90-Day Appeal countdown**.
   - Click **Approve Title** -> Show the official **Title Grant & Audit Dossier Certificate**.
   - Note: *"Notice how the status updates in real-time in our SQLite database via REST API."*
5. **Analytics & Transparency**: Click **Compliance Analytics** in the sidebar to showcase district conversion rates and average turnaround metrics.

---

## 4. Tech Stack Architecture
- **Frontend**: React 18, TypeScript, Tailwind CSS, Leaflet, Lucide Icons.
- **Backend API**: FastAPI (Python), Uvicorn, SQLite3.
- **Machine Learning**: Scikit-Learn (RandomForestClassifier), NumPy, mathematical SHAP attribution weights.
- **Geospatial Layers**: Carto Dark Telemetry, ESRI World Imagery, USGS Archival Reflectance.
