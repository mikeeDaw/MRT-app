import React, { useState, useContext, useEffect } from 'react'
import { Stations, DataArea } from '../components';
// import authCxt from '../components/context/AuthContext';
import Leaflet, { LatLngExpression, latLng } from "leaflet";
import {Middleware} from '../middleware/Middleware'
import { useParams } from 'react-router-dom';
const endpoint = process.env.REACT_APP_URL

const Home = () => {

    const [tabAdmin, setTabAdmin] = useState(false)
    const [allStations, setAllStations] = useState<any>([])
    const [polyLine, setPolyLine] = useState<LatLngExpression[][]>([])

    const pars = useParams()
    const {getToken} = Middleware()

    const getTheStations = async () => {
      const response = await fetch(`${endpoint}/station/get/all`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
        },
      }).then(async (jason) => {
          if(jason.status === 200){
              const data = await jason.json()
              setAllStations(data)
  
          } else {
              console.log('Error');
          }
      }).catch((error) => {
          console.log(error.message)
      })
    }

    useEffect(() => {
      getTheStations()
    }, [])

  // For polyline
  useEffect(()=>{
    let poly:any[] = []
    allStations.forEach((station:any) => {
      station.connected.forEach((code: String) => {
        let connect:any[] = [Leaflet.latLng(station.coordinates.x,station.coordinates.y)]
        let conStat = allStations.find((item:any) => item.code == code)
        connect.push(Leaflet.latLng(conStat.coordinates.x,conStat.coordinates.y))
        poly.push(connect)
      })
    })
    setPolyLine(poly)
  }, [allStations])

  console.log(pars)
  return (
    <div className='relative'>
        <Stations allStations={allStations} polyLine={polyLine} />
        <DataArea setTabAdmin={setTabAdmin} tabAdmin={tabAdmin} />
    </div>

  )
}
//14.5860943223 121.054023117 - ortigas
// 14.591570, 121.031310 - Shaw
// 14.576730, 121.034740 - Boni
// 14.5667810662, 121.040613171 - guadalupe
// 14.5525194566, 121.033789865 - buendia
// 14.5384028464, 121.018206594 - magallanes
// 14.53584119, 121.00084333 - taft
// 14.6046242482, 121.053864785 - santolan
// 14.6183225267, 121.050621464 - cubao
// 14.6344174623, 121.039349843 - kamuning
// 14.6428, 121.0385 - quezon ave.
// 14.6512990615, 121.026024896 - north ave 
export default Home