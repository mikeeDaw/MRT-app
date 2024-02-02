import Leaflet, { LatLngExpression, latLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { Red } from "../icons";
import Map from './Map'
const endpoint = process.env.REACT_APP_URL

interface Props {
  allStations : any[],
  polyLine : LatLngExpression[][]
}



const Stations : React.FC<Props> = ({allStations, polyLine}) => {
  // x , y

  // const [allStations, setAllStations] = useState<any>([])
  // const [polyLine, setPolyLine] = useState<LatLngExpression[][]>()

  // const getTheStations = async () => {
  //   const response = await fetch(`${endpoint}/station/get/all`, {
  //     method: 'GET',
  //     headers: {
  //         "Content-Type": 'application/json',
  //     },
  //   }).then(async (jason) => {
  //       if(jason.status === 200){
  //           const data = await jason.json()
  //           setAllStations(data)

            

  //       } else {
  //           console.log('Error');
  //       }
  //   }).catch((error) => {
  //       console.log(error.message)
  //   })
  // }

  // useEffect(()=>{
  //   getTheStations();
  // },[])

  // // For polyline
  // useEffect(()=>{
  //   let poly:any[] = []
  //   allStations.forEach((station:any) => {
  //     station.connected.forEach((code: String) => {
  //       let connect:any[] = [Leaflet.latLng(station.coordinates.x,station.coordinates.y)]
  //       let conStat = allStations.find((item:any) => item.code == code)
  //       connect.push(Leaflet.latLng(conStat.coordinates.x,conStat.coordinates.y))
  //       poly.push(connect)
  //     })
  //   })
  //   setPolyLine(poly)
  // }, [allStations])

  const titleCase = (inputString:String) => {
      return inputString.replace(/\w\S*/g, (word) => {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  // const polyline: LatLngExpression[][] = [
  //   [Leaflet.latLng(14.65617, 121.028032), Leaflet.latLng(14.6428, 121.0345)],
  //   [
  //     Leaflet.latLng(14.6428, 121.0345),
  //     Leaflet.latLng(14.6344174623, 121.039349843),
  //   ],
  //   [
  //     Leaflet.latLng(14.6344174623, 121.039349843),
  //     Leaflet.latLng(14.6183225267, 121.050621464),
  //   ],
  //   [
  //     Leaflet.latLng(14.6183225267, 121.050621464),
  //     Leaflet.latLng(14.6046242482, 121.053864785),
  //   ],
  //   [
  //     Leaflet.latLng(14.6046242482, 121.053864785),
  //     Leaflet.latLng(14.5860943223, 121.054023117),
  //   ],
  //   [
  //     Leaflet.latLng(14.5860943223, 121.054023117),
  //     Leaflet.latLng(14.575502698, 121.052208124),
  //   ],
  //   [
  //     Leaflet.latLng(14.575502698, 121.052208124),
  //     Leaflet.latLng(14.5718, 121.0481),
  //   ],
  //   [
  //     Leaflet.latLng(14.5718, 121.0481),
  //     Leaflet.latLng(14.5667810662, 121.040613171),
  //   ],
  //   [
  //     Leaflet.latLng(14.5667810662, 121.040613171),
  //     Leaflet.latLng(14.5525194566, 121.033789865),
  //   ],
  //   [
  //     Leaflet.latLng(14.5525194566, 121.033789865),
  //     Leaflet.latLng(14.5426961625, 121.023269907),
  //   ],
  //   [
  //     Leaflet.latLng(14.5426961625, 121.023269907),
  //     Leaflet.latLng(14.5384028464, 121.018206594),
  //   ],
  //   [
  //     Leaflet.latLng(14.5384028464, 121.018206594),
  //     Leaflet.latLng(14.53584119, 121.00084333),
  //   ],
  // ];
  const LineOpts = { color: "#0E137D", weight: 5 };
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
            return (
              <>
              <Marker key={markKey} position={[coords.x, coords.y]}>
                <Popup>
                  A pretty CSS3 spopup. <br /> {titleCase(station.name)}
                </Popup>
              </Marker>

              <Marker
                key={Number('86'+String(markKey))}
                position={[coords.x, coords.y]}
                icon={Leaflet.divIcon({
                  className: "marker-label",
                  html: `<span class="border-2 border-slate-500 py-0.5 w-[95px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > ${titleCase(station.name)} </span>`
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
