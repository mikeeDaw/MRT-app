import React, { useEffect, useRef, useState } from 'react'
import {Middleware} from '../../../middleware/Middleware';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import Leaflet, { LatLngExpression, latLng } from "leaflet";
import { Red } from '../../../icons';
import StationCard from './StationCard';
const endpoint = process.env.REACT_APP_URL

const Stations = () => {

    const {getToken, logout} = Middleware()

    const tileMap = useRef<any>()
    const [stationCard, setStationCard] = useState<any[]>([])
    const [selectedSt, setSelectedSt] = useState({})

    const getAllStations = async () => {
      const response = await fetch(`${endpoint}/station/get/all`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            'Authorization': getToken()
        },
        }).then(async (jason) => {
            if(jason.status === 200){
                const data = await jason.json()
                setStationCard(data)
                console.log(data)
            } else {
                console.log('Error');
                logout()
            }
        }).catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(()=> {
      getAllStations()
    },[])

    const titleCase = (inputString:String) => {
      return inputString.replace(/\w\S*/g, (word) => {
          return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });

  }

  let delay=0;

  return (
    <>
    <div className='p-10 flex flex-row h-full justify-center gap-16'>
      {/* Map & Edit Section */}
      <div className='flex flex-col h-full w-5/12'>

        <div className='rounded-2xl h-4/6 z-0'>
           <MapContainer
              center={[14.6183225267, 121.050621464]}
              zoom={16}
              className='h-full w-full rounded-t-2xl'
            >
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                ref={tileMap}
              />

              <Marker key={4} position={[14.6183225267, 121.050621464]}
                icon={Leaflet.icon({
                  iconUrl: Red,
                  iconSize: [40, 40],
                  iconAnchor: [25, 50],
              })}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>

           </MapContainer>
        </div>
        <div className='rounded-b-2xl h-1/2 flex ps-3 border-2 border-t-0 border-slate-800'> 
          <div className='w-4/6 p-3'>
              <div className='flex flex-col justify-center h-full'>

                <span className='text-sm font-bold'> Station Name</span>
                <input className='bg-transparent p-0 text-sm text-slate-500 mt-1 me-10 focus:border-none editInp mb-3' style={{border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={'Kunware Station'} />

                <span className='text-sm font-bold'> Station Code </span>
                <input className='bg-transparent p-0 text-sm text-slate-500 mt-1 me-10 focus:border-none editInp mb-3' style={{border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={'KUN385'} />

                <span className='text-sm font-bold mb-1'> Coordinates </span>
                <div className='flex w-full ps-1 pe-6 gap-3'>
                  <div className='flex items-center w-1/2 gap-2'>
                    <span className=''> X </span>
                    <input className='bg-transparent w-full p-0 text-sm text-slate-500 focus:border-none mb-1 editInp px-2' style={{border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={'10.234434'} />
                  </div>
                  <div className='flex items-center w-1/2 gap-2'>
                    <span> Y </span>
                    <input className='bg-transparent w-full p-0 text-sm text-slate-500 focus:border-none editInp mb-1 px-2' style={{border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={'9.23342'} />
                  </div>
                </div>


              </div>
          </div>
          <div className='border-l border-[#6f6f6f] bg-[#6f6f6f] rounded-br-xl flex flex-col w-2/6 p-3 py-4 gap-2'>
            <span className='text-xs font-bold text-white'>Connections:</span>
            <div className='flex flex-col pb-3 h-full gap-1 overflow-y-scroll scrollbar-hide'>
              <button className='text-sm p-1 border rounded-xl bg-white '>
                Ayala
              </button>
              <button className='text-sm p-1 border rounded-xl bg-white '>
                Boni
              </button>
              <button className='text-sm p-1 border rounded-xl bg-white '>
                Quezon Ave
              </button>
              <button className='text-sm p-1 border rounded-xl bg-white '>
                Taft
              </button>
              <button className='text-sm p-1 border rounded-xl bg-white '>
                Ayala
              </button>
              <button className='text-sm p-1 border rounded-xl bg-white '>
                Ayala
              </button>
            </div>
          </div>
        </div>

      </div>
      {/* Stations List Section */}
      <div className='flex flex-col w-5/12 p-5 pb-6 rounded-xl gap-3' style={{boxShadow: '4px 4px 22px -5px #696969'}}>
        <table>
          <thead>
            <tr className=''>
              <th className='border-b-2 text-left ps-5 border-slate-500 pb-3 text-slate-500'> Code </th>
              <th className='border-b-2 text-left border-slate-500 pb-3 text-slate-500'> Station Name </th>
              <th className='border-b-2 border-slate-500 pb-3 text-slate-500' />
            </tr>
          </thead>
        </table>
          {/* <div className='bg-lime-100 py-3 px-2 flex flex-row'> 
              <span> Header here *</span>
          </div> */}
          <div className='flex flex-col h-full gap-2 overflow-y-scroll scrollbar-hide'> 
              <table className='border-separate mb-2 border-spacing-y-2'>
                <tbody>

                  {
                    stationCard.map((card) => {
                    delay+=0.12
                    return <StationCard key={card.code} code={card.code} name={titleCase(card.name) + " Station"} delay={delay} />
                  } )
                  }

                </tbody>
              </table>
          
          </div>
      </div>
    </div>
    </>
  )
}

export default Stations