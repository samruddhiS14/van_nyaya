import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import type { Claim } from '../../types/claim';
import { Sparkles } from 'lucide-react';

type LatLngTuple = [number, number];

const DefaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string };
delete DefaultIcon._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface ClaimMapProps {
  claims: Claim[];
  selectedClaim: Claim | null;
  onSelectClaim: (claim: Claim) => void;
}

export const ClaimMap: React.FC<ClaimMapProps> = ({ claims, selectedClaim, onSelectClaim }) => {
  const defaultCenter: LatLngTuple = [23.125, 76.985];
  const [archivalMode, setArchivalMode] = useState(false);

  const getColor = (risk: string) => {
    switch (risk) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      default: return '#10b981';
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }} className="rounded-xl overflow-hidden border border-slate-200 relative shadow-sm">
      {/* Pre-2005 Archival Radar Toggle */}
      <div className="absolute top-3 right-3 z-[1000]">
        <button
          onClick={() => setArchivalMode(!archivalMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 backdrop-blur-md ${
            archivalMode
              ? 'bg-amber-600 text-white border border-amber-400'
              : 'bg-white/90 text-slate-800 border border-slate-300 hover:bg-white'
          }`}
        >
          <Sparkles size={13} className={archivalMode ? 'animate-spin' : ''} />
          {archivalMode ? 'Pre-2005 Landsat Mode' : 'Toggle Pre-2005 Archival'}
        </button>
      </div>

      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="OpenStreetMap Standard">
            <TileLayer
              attribution='OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="High-Res Satellite">
            <TileLayer
              attribution='ESRI World Imagery'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Archival Heat/Reflectance Simulation Layer */}
        {archivalMode && (
          <TileLayer
            opacity={0.65}
            attribution='USGS Landsat-7 Archival NIR'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        {claims.map((claim) => (
          <Polygon
            key={claim.id}
            positions={claim.coordinates as LatLngTuple[]}
            pathOptions={{
              color: getColor(claim.risk_level),
              fillColor: getColor(claim.risk_level),
              fillOpacity: selectedClaim?.id === claim.id ? 0.7 : 0.25,
              weight: selectedClaim?.id === claim.id ? 3 : 1.5,
              dashArray: !claim.pre_2005_verified ? '5, 5' : undefined,
            }}
            eventHandlers={{ click: () => onSelectClaim(claim) }}
          >
            <Popup>
              <div className="text-slate-900 text-xs">
                <p className="font-bold">{claim.claimant_name}</p>
                <p className="font-mono text-slate-500">{claim.id}</p>
                <p>Claimed: {claim.area_claimed_hectares} ha</p>
                <p>GIS Area: {claim.gis_computed_area_hectares} ha</p>
              </div>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
};
