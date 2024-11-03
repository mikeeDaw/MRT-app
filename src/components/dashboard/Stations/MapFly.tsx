import L, { LatLngExpression } from "leaflet";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  station: any | null;
  zoom: number;
}

const MapFly: React.FC<Props> = ({ station, zoom }) => {
  const map = useMap();
  const flyDuration = 1.5;

  const fly = (location: LatLngExpression) => {
    map.flyTo(location, zoom, {
      animate: true,
      duration: flyDuration,
    });
  };

  const flyCenter = () => {
    map.flyTo([14.59673, 121.04809], 12, {
      animate: true,
      duration: flyDuration,
    });
  };

  useEffect(() => {
    if (station) {
      fly(L.latLng(station.coordinates.x, station.coordinates.y));
    } else {
      flyCenter();
    }
  }, [station]);

  return null;
};

export default MapFly;
