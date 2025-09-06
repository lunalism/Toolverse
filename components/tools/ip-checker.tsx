// src/components/tools/ip-checker.tsx

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 마커 아이콘 이미지 파일을 직접 가져오는 대신, 경로를 재정의합니다.
import markerIcon from 'leaflet/dist/images/marker-icon.png';

// Leaflet 마커 아이콘 설정
const defaultIcon = new L.Icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Map 컴포넌트
function MapComponent({ lat, lon, city }: { lat: number; lon: number; city: string }) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: '300px', width: '100%' }}
      className="rounded-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]}>
        <Popup>
          현재 위치: {city}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export function IpChecker() {
  const [ipInfo, setIpInfo] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIpInfo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ip');
      if (!response.ok) {
        throw new Error('IP 정보를 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      if (data.status === 'fail') {
        throw new Error(data.message);
      }
      setIpInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">IP 주소 확인</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-6 border rounded-md min-h-[150px] flex items-center justify-center">
            {isLoading ? (
              <p className="text-muted-foreground text-center">IP 정보를 가져오는 중...</p>
            ) : error ? (
              <p className="text-destructive text-center">{error}</p>
            ) : ipInfo ? (
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <p><strong>IP 주소:</strong> {ipInfo.query}</p>
                  <p><strong>국가:</strong> {ipInfo.country}</p>
                  <p><strong>도시:</strong> {ipInfo.city}</p>
                  <p><strong>ISP:</strong> {ipInfo.isp}</p>
                </div>
                {ipInfo.lat && ipInfo.lon && (
                  <MapComponent lat={ipInfo.lat} lon={ipInfo.lon} city={ipInfo.city} />
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">IP 정보를 확인할 수 없습니다.</p>
            )}
          </div>
          <Button onClick={fetchIpInfo}>새로고침</Button>
        </div>
      </CardContent>
    </Card>
  );
}