import Leaflet, { LatLngExpression } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import CenterMap from "./CenterMap";
import { TapMethod } from "./context/Context";
import Map from "./Map";
const endpoint = process.env.REACT_APP_URL;

interface Props {
  allStations: any[];
  polyLine: LatLngExpression[][];
  currStation: string;
  routePoly: LatLngExpression[][];
}

const Stations: React.FC<Props> = ({
  allStations,
  polyLine,
  currStation,
  routePoly,
}) => {
  // x , y

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(0);
  const nav = useNavigate();

  const titleCase = (inputString: String) => {
    return inputString.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  };

  const handleResize = () => {
    const winSiz = window.innerWidth;
    if (winSiz < 640) {
      setLat(14.51873);
      setLng(121.01409);
      setZoom(12.3);
    } else if (winSiz > 786) {
      setLat(14.59673);
      setLng(121.07609);
      setZoom(12.3);
    }
  };
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    handleResize();
  }, []);

  const tapMeth = useContext(TapMethod);

  const LineOpts = { color: "#0E137D", weight: 7 };
  const LineOptsRoute = { color: "#026d49", weight: 7 };
  let markKey = 0;

  return (
    <div key={9384} className="w-screen h-[150vh] md:h-screen absolute z-0">
      <Map
        key={911}
        center={[14.59673, 121.07609]}
        zoom={12}
        scrollWheelZoom={false}
        dragging={true}
        zoomControl={true}
        doubleClickZoom={false}
        maxZoom={15}
        styles={"w-full h-full"}
      >
        {allStations.map((station: any, idx) => {
          let coords = station.coordinates;

          return (
            <>
              {station.name === currStation.toUpperCase() ? (
                <>
                  <Marker
                    key={idx + 460}
                    position={[coords.x, coords.y]}
                    eventHandlers={{
                      click: (e) => {
                        nav(`/${station.name.toLowerCase()}/${tapMeth.pass}`);
                      },
                    }}
                    icon={Leaflet.divIcon({
                      className: "bg-none",
                      html: `<div class="bg-[#d0ff1d] rounded-full p-3 border-4 border-[#0E137D] translate-x-[-30%] translate-y-[-25%] relative z-10"> </div>`,
                    })}
                  />
                </>
              ) : (
                <>
                  <Marker
                    key={Math.floor(Math.random() * 999)}
                    position={[coords.x, coords.y]}
                    icon={Leaflet.divIcon({
                      className: "bg-none",
                      html: `<div class="bg-[#0ed5aa] rounded-full p-2.5 border-4 border-[#0E137D] translate-x-[-30%] translate-y-[-25%] relative z-10"> </div>`,
                    })}
                    eventHandlers={{
                      click: (e) => {
                        nav(`/${station.name.toLowerCase()}/${tapMeth.pass}`);
                      },
                    }}
                  />
                </>
              )}

              <Marker
                key={Math.floor(Math.random() * 999)}
                position={[coords.x, coords.y]}
                icon={Leaflet.divIcon({
                  className: "marker-label",
                  html: `<span class="border-2 border-[#0E137D] py-0.5 w-[95px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > ${titleCase(
                    station.name
                  )} </span>`,
                })}
              />
            </>
          );
        })}

        <CenterMap lat={lat} lng={lng} zoom={zoom} />
        <Polygon
          key={232323}
          positions={polyLine ?? []}
          pathOptions={LineOpts}
        />
        <Polygon
          key={10231}
          positions={routePoly ?? []}
          pathOptions={LineOptsRoute}
        />
      </Map>
    </div>
  );
};

export default Stations;
