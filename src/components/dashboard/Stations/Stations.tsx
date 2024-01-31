import React, { useEffect, useRef, useState } from 'react'
import {Middleware} from '../../../middleware/Middleware';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import Leaflet, { LatLngExpression, latLng } from "leaflet";
import { Red } from '../../../icons';
import StationCard from './StationCard';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { simpleFade } from '../../../constants/animate';
import { StationMod } from '../../types/models';
import MapFly from './MapFly';
const endpoint = process.env.REACT_APP_URL

const Stations = () => {

    const {getToken, logout} = Middleware()

    const tileMap = useRef<any>()
    const [stationCard, setStationCard] = useState<any[]>([])
    const [selectedSt, setSelectedSt] = useState<StationMod | undefined >(undefined)
    const [origPoly, setOrigPoly] = useState<LatLngExpression[][]>()
    const [codeList, setCodeList] = useState<{code:String, name:String}[]>([])

    // States for Station editing
    const [name, setName] = useState("");
    const [sCode, setScode] = useState("");
    const [xCoord, setXCoord] = useState(0);
    const [yCoord, setYCoord] = useState(0);
    const [editing, setEditing] = useState(false)
    const [sortedConn,setSortedConn] = useState<{code:String, name:String}[]>([])
    const [connects, setConnects] = useState<String[]>([])

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

    const updateTheStation = async () => {
      const response = await fetch(`${endpoint}/station/updateStat`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": getToken()
        },
        body: JSON.stringify({origCode: selectedSt?.code, code: sCode, name:name, connected: connects, coordinates: {x:xCoord,y:yCoord}})
      }).then(async (jason) => {
          if(jason.status === 200){
              const data = await jason.json()
              console.log('UPDATED:',data)
          } else {
              console.log('Error');
          }
      }).catch((error) => {
          console.log(error.message)
      })
      getAllStations()
      setEditing(false);
    }

    useEffect(()=> {
      getAllStations()
    },[])

    useEffect(()=>{
      let poly:any[] = []
      let codes: {code:String, name:String}[] = []
      stationCard.forEach((station:any) => {
        codes.push({code:station.code, name:station.name})
        station.connected.forEach((code: String) => {
          let connect:any[] = [Leaflet.latLng(station.coordinates.x,station.coordinates.y)]
          let conStat = stationCard.find((item:any) => item.code == code)
          connect.push(Leaflet.latLng(conStat.coordinates.x,conStat.coordinates.y))
          poly.push(connect)
        })
      })
      setOrigPoly(poly)
      setCodeList(codes)
    }, [stationCard])

  const titleCase = (inputString:String) => {
    return inputString.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
  }
  
  const stationSelect = (station:StationMod) => {
    setName(String(station.name))
    setScode(String(station.code))
    setXCoord(Number(station.coordinates.x))
    setYCoord(Number(station.coordinates.y))
    setSelectedSt(station)
    setConnects(station.connected)
  }

  function moveToFront(...codesToMove: String[]): {code:String, name:String}[] {
    const newArray = [...codeList]; // Create a copy of the original array
  
    codesToMove.forEach((codeToMove) => {
      const index = newArray.findIndex((obj) => obj.code === codeToMove);
  
      if (index !== -1) {
        const movedObject = newArray.splice(index, 1); // Remove the object from its current position
        newArray.unshift(movedObject[0]); // Add the object to the beginning of the array
      }
    });
  
    return newArray;
  }

  const statClick = (card: StationMod) => {

    stationSelect(card)
    setSortedConn(moveToFront(...card.connected))
  }

  let delay=0;
  let MKey = 0;

  return (
    <>
    <div className='p-10 flex flex-row h-full justify-center gap-16'>
      {/* Map & Edit Section */}
      <div className='flex flex-col h-full w-5/12'>
        {/* Map Part */}
        <div className='rounded-2xl h-3/6 z-0'>
           <MapContainer
              center={[14.6183225267, 121.050621464]}
              zoom={16}
              className='h-full w-full rounded-t-2xl'
            >
              <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                ref={tileMap}
              />

              {
                stationCard.map((stat)=> {
                  let coords = stat.coordinates
                  MKey+=1;
                  return (
                    <>
                    <Marker key={MKey} position={[coords.x, coords.y]}
                    icon={Leaflet.divIcon({
                      className: "bg-none",
                      html: `<div class="bg-[#202758] rounded-full p-2.5 border-4 border-[#0ed5aa] translate-x-[-30%] translate-y-[-25%]"> </div>`
                    })}
                    >
                    </Marker>
                    </>
                  )
                })
              }
              {/* <Marker key={4} position={[14.6183225267, 121.050621464]}
                icon={Leaflet.icon({
                  iconUrl: Red,
                  iconSize: [40, 40],
                  iconAnchor: [25, 50],
              })}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}

              <MapFly station={selectedSt} zoom={15} />

              <Polygon positions={origPoly ?? []} pathOptions={{weight:6, color:'#0ed5aa'}}></Polygon>
           </MapContainer>
        </div>
        {/* Map Edit area */}
        <div className='rounded-b-2xl h-1/2 h-3/6 flex ps-3 border-2 border-t-0 border-slate-800'> 
          <div className='w-4/6 p-3'>
              <div className='flex flex-col justify-center h-full relative'>

                <span className='text-sm font-bold'> Station Name</span>
                <input className='bg-transparent p-0 text-sm text-slate-500 mt-1 me-10 focus:border-none editInp mb-3' style={editing ? {border:'none', borderBottom:'1px solid #00B38C', color:'#00B38C' } : {border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={name ? titleCase(name) : '- Select a Station -' } disabled={!editing} onChange={(e) => {
                  setName(e.target.value) }} />

                <span className='text-sm font-bold'> Station Code </span>
                <input className='bg-transparent p-0 text-sm text-slate-500 mt-1 me-10 focus:border-none editInp mb-3' style={editing ? {border:'none', borderBottom:'1px solid #00B38C', color:'#00B38C' } : {border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={sCode ? sCode : '- Select a Station -'} disabled={!editing} onChange={(e) => {
                  setScode(e.target.value) }} />

                <span className='text-sm font-bold mb-1'> Coordinates </span>
                <div className='flex w-full ps-1 pe-6 gap-3'>
                  <div className='flex items-center w-1/2 gap-2'>
                    <span className=''> X </span>
                    <input className='bg-transparent w-full p-0 text-sm text-slate-500 focus:border-none mb-1 editInp px-2' style={editing ? {border:'none', borderBottom:'1px solid #00B38C', color:'#00B38C' } : {border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={xCoord ? xCoord : '- N/A -'} disabled={!editing} onChange={(e) => {
                  setXCoord(Number(e.target.value)) }} />
                  </div>
                  <div className='flex items-center w-1/2 gap-2'>
                    <span> Y </span>
                    <input className='bg-transparent w-full p-0 text-sm text-slate-500 focus:border-none editInp mb-1 px-2' style={editing ? {border:'none', borderBottom:'1px solid #00B38C', color:'#00B38C' } : {border:'none', borderBottom:'1px solid #a7a7a7'}} type="text" value={yCoord ? yCoord : '- N/A -'} disabled={!editing}  onChange={(e) => {
                  setYCoord(Number(e.target.value)) }} />
                  </div>
                </div>

                <AnimatePresence>
                {
                  editing ? (
                    <>
                    <motion.button key={'Close'} className='absolute right-14 top-2 border p-1.5 rounded-full bg-[#e73030] border-[#e73030]' id='constCanc' onClick={()=>{setEditing(false)}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} exit={{opacity:0}}> 
                      <svg viewBox="0 0 24 24" fill="none" className='w-4' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" strokeWidth="2" stroke='#FFFFFF' fill="#ffffff"></path> </g></svg>
                    </motion.button>
                    <motion.button key={"Conf"} className='absolute right-4 top-2 border p-1.5 rounded-full bg-[#10c78c] border-[#10c78c]' id='constConf' onClick={updateTheStation} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} exit={{opacity:0}}> 
                      <svg viewBox="0 0 24 24" className='w-4' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </motion.button>
                    </>
                  ) : (
                    <motion.button key={"Editt"} className='absolute right-4 top-2 border p-1.5 rounded-full border-[#b1b1b1]' onClick={selectedSt ? ()=>{setEditing(true)} : ()=>{} } initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} exit={{opacity:0}}> 
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='w-4 translate-x-[-1px]' fill="none"><g id="SVGRepo_bgCarrier" ></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" fillRule="evenodd" d="M17.586 2a2 2 0 0 1 2.828 0L22 3.586a2 2 0 0 1 0 2.828L20.414 8 16 3.586 17.586 2zm-3 3-5 5A2 2 0 0 0 9 11.414V13a2 2 0 0 0 2 2h1.586A2 2 0 0 0 14 14.414l5-5L14.586 5z" clipRule="evenodd"></path><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 14H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4"></path></g></svg> 
                    </motion.button>
                  )
                }
                </AnimatePresence>



              </div>
          </div>
          <div className='border-l border-[#6f6f6f] bg-[#6f6f6f] rounded-br-xl flex flex-col w-2/6 p-3 py-4 gap-2'>
            <span className='text-xs font-bold text-white'>Connections:</span>
            <div className='flex flex-col pb-3 h-full gap-1 overflow-y-scroll scrollbar-hide'>

              {
                selectedSt ? (
                  sortedConn.map((code) => {
                    const flag = connects.find((item) => item == code.code)
                    return (
                      <>
                      <motion.button key={String(code.code)} className={'text-sm p-1 border rounded-xl ' + (flag ? 'bg-[#3ee7c3] border-[#3ee7c3] font-bold hover:bg-red-600 hover:border-red-600 hover:text-white ' : 'bg-white hover:bg-[#3ee7c3] hover:border-[#3ee7c3] hover:font-bold ') + (editing ? 'opacity-1' : 'pointer-events-none opacity-85')}
                      onClick={editing ? ()=>{
                        if(flag){
                          setConnects(connects.filter((itemCode) => itemCode != code.code))
                        } else {
                          setConnects([...connects, code.code])
                        }
                      } : 
                      () => {}}>
                        {titleCase(code.name)}
                      </motion.button>
                      </>
                    )
                  })
                ) : (
                  <>
                  </>
                )

              }
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
                    return <StationCard key={card.code} code={card.code} name={titleCase(card.name) + " Station"} delay={delay} selected={selectedSt ? (selectedSt.code == card.code) : false} setSelect={() => {statClick(card); setEditing(false)}} />
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