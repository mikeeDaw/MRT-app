import Leaflet from "leaflet";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface Props {
  children?: React.ReactNode;
  center: Leaflet.LatLngExpression;
  zoom: number;
  zoomSnap?: number;
  scrollWheelZoom?: boolean;
  dragging?: boolean;
  zoomControl?: boolean;
  doubleClickZoom?: boolean;
  styles: string;
  minZoom?: number;
  maxZoom?: number;
}

const Map: React.FC<Props> = ({
  center,
  zoom,
  zoomSnap,
  scrollWheelZoom,
  dragging,
  zoomControl,
  doubleClickZoom,
  styles,
  minZoom,
  maxZoom,
  children,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomSnap={zoomSnap}
      scrollWheelZoom={scrollWheelZoom}
      dragging={dragging}
      zoomControl={zoomControl}
      doubleClickZoom={doubleClickZoom}
      className={styles}
      minZoom={minZoom}
      maxZoom={maxZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
    </MapContainer>
  );
};

export default Map;
