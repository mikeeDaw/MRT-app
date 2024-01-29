import React, { useEffect, useRef } from 'react'
import {Middleware} from '../../../middleware/Middleware';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import Leaflet, { LatLngExpression, latLng } from "leaflet";
import { Red } from '../../../icons';

const Stations = () => {

    const {getToken} = Middleware()

    const tileMap = useRef<any>()

  return (
    <>
    <div className='p-10 flex flex-row h-full justify-center gap-16'>
      <div className='flex flex-col h-full w-5/12 bg-slate-100 p-5 gap-5'>

        <div className='bg-red-100 h-1/2 rounded-xl'>
           <MapContainer
              center={[14.6183225267, 121.050621464]}
              zoom={16}
              className='h-full w-full rounded-2xl'
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ref={tileMap}
              />

              <Marker key={4} position={[14.6183225267, 121.050621464]}
                icon={Leaflet.icon({
                  iconUrl: Red,
                  iconSize: [50, 50],
                  iconAnchor: [25, 50],
              })}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>

           </MapContainer>
        </div>
        <div className='bg-orange-100 h-1/2'> Editing space </div>

      </div>

      <div className='flex flex-col w-5/12 bg-cyan-100 p-5 gap-3'>
          <div className='bg-lime-100 py-3 px-2 flex flex-row'> 
              <span> Code </span>
              <span> Name </span>
          </div>
          <div className='flex flex-col bg-emerald-100 h-full'> Station Cards </div>
      </div>
    </div>
    </>
  )
}

export default Stations