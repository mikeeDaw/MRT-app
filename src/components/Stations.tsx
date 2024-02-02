import Leaflet, { LatLngExpression, latLng } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { TapMethod } from "./context/Context";
import { Red } from "../icons";
import Map from './Map'
const endpoint = process.env.REACT_APP_URL

interface Props {
  allStations : any[],
  polyLine : LatLngExpression[][],
  currStation : string
}

const Stations : React.FC<Props> = ({allStations, polyLine, currStation}) => {
  // x , y

  const titleCase = (inputString:String) => {
      return inputString.replace(/\w\S*/g, (word) => {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  const tapMeth = useContext(TapMethod)
  
  const LineOpts = { color: "#0E137D", weight: 7 };
  let markKey = 0;
  

  return (
    <div className="w-screen h-screen absolute z-0">
        <Map
            center={[14.59673, 121.07609]}
            zoom={12.3}
            zoomSnap={12.5}
            scrollWheelZoom={false}
            dragging={false}
            zoomControl={false}
            doubleClickZoom={false}
            styles={"w-full h-screen"}
        >


        {
          allStations.map((station:any)=> {
            let coords = station.coordinates
            markKey+=1;
            // console.log(station.name, currStation.toUpperCase())]

            return (
              <>

              {
                (station.name == currStation.toUpperCase()) ? (
                  <>
                  <Marker key={markKey} position={[coords.x, coords.y]}
                  icon={Leaflet.divIcon({
                    className: "bg-none",
                    html: `<div class="bg-[#d0ff1d] rounded-full p-3 border-4 border-[#0E137D] translate-x-[-30%] translate-y-[-25%] relative z-10"> </div>`
                  })}
                  />
                  </>
                  
                ) : (
                  <>
                  <Marker key={markKey} position={[coords.x, coords.y]}
                  icon={Leaflet.divIcon({
                    className: "bg-none",
                    html: `<div class="bg-[#0ed5aa] rounded-full p-2.5 border-4 border-[#0E137D] translate-x-[-30%] translate-y-[-25%] relative z-10"> </div>`
                  })}
                  />
                  </>
                )
              }

              <Marker
                key={Number('86'+String(markKey))}
                position={[coords.x, coords.y]}
                icon={Leaflet.divIcon({
                  className: "marker-label",
                  html: `<span class="border-2 border-[#0E137D] py-0.5 w-[95px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > ${titleCase(station.name)} </span>`
                })}
              />  

              </>
            )
          })
        }

        <Polygon positions={polyLine ?? []} pathOptions={LineOpts} />
      </Map>
    </div>
  );
};

export default Stations;
