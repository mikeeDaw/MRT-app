import React,{useEffect, useState} from 'react'
import { Map, MapEvents, InputField } from '..';
import { Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import Leaflet, {LatLngExpression} from 'leaflet'
import { Label, Select } from 'flowbite-react';
import ConnSelect from './ConnSelect';
import {Middleware} from '../../middleware/Middleware';

const AddStation = () => {

    const {getToken} = Middleware()

    const polyline: LatLngExpression[][] = [
        [Leaflet.latLng(14.65617, 121.028032), Leaflet.latLng(14.6428, 121.0345)],
        [
          Leaflet.latLng(14.6428, 121.0345),
          Leaflet.latLng(14.6344174623, 121.039349843),
        ],
        [
          Leaflet.latLng(14.6344174623, 121.039349843),
          Leaflet.latLng(14.6183225267, 121.050621464),
        ],
        [
          Leaflet.latLng(14.6183225267, 121.050621464),
          Leaflet.latLng(14.6046242482, 121.053864785),
        ],
        [
          Leaflet.latLng(14.6046242482, 121.053864785),
          Leaflet.latLng(14.5860943223, 121.054023117),
        ],
        [
          Leaflet.latLng(14.5860943223, 121.054023117),
          Leaflet.latLng(14.575502698, 121.052208124),
        ],
        [
          Leaflet.latLng(14.575502698, 121.052208124),
          Leaflet.latLng(14.5718, 121.0481),
        ],
        [
          Leaflet.latLng(14.5718, 121.0481),
          Leaflet.latLng(14.5667810662, 121.040613171),
        ],
        [
          Leaflet.latLng(14.5667810662, 121.040613171),
          Leaflet.latLng(14.5525194566, 121.033789865),
        ],
        [
          Leaflet.latLng(14.5525194566, 121.033789865),
          Leaflet.latLng(14.5426961625, 121.023269907),
        ],
        [
          Leaflet.latLng(14.5426961625, 121.023269907),
          Leaflet.latLng(14.5384028464, 121.018206594),
        ],
        [
          Leaflet.latLng(14.5384028464, 121.018206594),
          Leaflet.latLng(14.53584119, 121.00084333),
        ],
      ];
    const LineOpts = { color: "#0E137D", weight: 5 };
  
    const [latitude, setLatitude] = useState<Number | undefined>(undefined);
    const [longitude, setLongitude] = useState<Number | undefined>(undefined);
    const [oldMarker, setOldMarker] = useState<Leaflet.Marker | undefined>(undefined)
    const [newConns, setNewConns] = useState(0)
    //const [conDropdowns, setConnDropdowns] = useState<any[]>([])

    let conDropdowns : any[]  = []
    // for (let i = 0; i < newConns; i++) {
    //   conDropdowns.push(
    //     <div className="w-full flex" id={`sel${i}`}>
    //       <Select required className='w-5/6'>
    //         <option>Ayala</option>
    //         <option>Buendia</option>
    //         <option>Cubao</option>
    //         <option>Taft</option>
    //       </Select>
    //       <div className='w-1/6 flex justify-center items-center cursor-pointer'>
    //         <svg fill="#f03838" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.29 310.29" stroke="#f03838"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" ></g><g id="SVGRepo_iconCarrier"> <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142 C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32 c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"></path> </g></svg>
    //       </div>
    //     </div>
    //   )
    // }

    let removeCon = (id: String) => {
      conDropdowns.filter((elem) => {return elem.props.id != id})
    }

    for(let i = 0; i < newConns; i++){
      conDropdowns.push( (<ConnSelect key={`sel${i}`} id={"sel" + i } handleClick={() => { removeCon(`sel${i}`)}} />) )

    }

  return (
    <>
      <div className="w-full h-full absolute top-0 left-0 z-0">
      <Map
        center={[14.59673, 121.07609]}
        zoom={12}
        scrollWheelZoom={true}
        dragging={true}
        minZoom={11}
        doubleClickZoom={true}
        maxZoom={14}
        styles="h-full w-full"
      >  
  {
    // North Ave
  }
  <Marker key={1} position={[14.65617, 121.028032]}>
    <Popup>
      A pretty CSS3 spopup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Quezon Ave
  }
  <Marker key={2} position={[14.6428, 121.0345]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Kamuning
  }
  <Marker key={3} position={[14.6344174623, 121.039349843]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Araneta Center - Cubao
  }
  <Marker key={4} position={[14.6183225267, 121.050621464]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Santolan
  }
  <Marker key={5} position={[14.6046242482, 121.053864785]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Ortigas
  }
  <Marker
    key={6}
    position={[14.5860943223, 121.054023117]}
  >
    <Popup offset={[0, -40]}>
      A pretty ORt popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Shaw
  }
  <Marker key={7} position={[14.575502698, 121.052208124]}>
    <Popup>
      A pretty CSS3 XXX. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Boni
  }
  <Marker key={8} position={[14.5718, 121.0481]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Guadalupe
  }
  <Marker key={9} position={[14.5667810662, 121.040613171]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Buendia
  }
  <Marker key={10} position={[14.5525194566, 121.033789865]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Ayala
  }
  <Marker key={11} position={[14.5426961625, 121.023269907]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Magallanes
  }
  <Marker key={12} position={[14.5384028464, 121.018206594]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  {
    // Taft
  }
  <Marker key={13} position={[14.53584119, 121.00084333]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>

  <Polygon positions={polyline} pathOptions={LineOpts} />

  <MapEvents setLatitude={setLatitude} setLongitude={setLongitude} setOldMarker={setOldMarker} oldMarker={oldMarker}/>
    </Map>
      </div>
          <div className="absolute right-16 xl:right-28 top-24 bg-white z-10 p-5 w-[320px] rounded-xl" style={{boxShadow: "0 0 10px -3px #474747"}}>
            <div className="flex flex-col" >
              <span> Add New Station </span>
              <div className='max-h-[270px] overflow-y-scroll scrollbar-hide'>
                <div className="flex gap-3 mt-4 h-[44px]">
                  
                  <InputField forImg={false} textIcon="X" placeholder="12.54704" inpValue={String(longitude)} />

                  <InputField forImg={false} textIcon="Y" placeholder="14.5643" inpValue={String(latitude)} />

                </div>
                
                <input type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mt-1" placeholder="Station Name"></input>

                <span className="mt-3 mb-2 block"> Connected To: </span>

                <div className="flex flex-col justify-between gap-3">
              
                <div className="w-full flex">
                  <Select required className='w-full'>
                    <option>Ayala</option>
                    <option>Buendia</option>
                    <option>Cubao</option>
                    <option>Taft</option>
                  </Select>
                </div>

                {
                  conDropdowns.map((div) => div)
                }

                <button className='bg-slate-100 px-3 py-1 cursor-pointer rounded-xl border-dashed border-4 border-slate-400'
                onClick={() => {setNewConns(newConns+1)} }
                >
                  <span className='text-sm text-slate-500'>+ Add Connection</span>
                </button>

                  
                </div>
            </div>
            <div className="text-end mt-4">
                <button className="bg-[#202758] px-4 text-white py-1 rounded-xl"> Save </button>
            </div>
            </div>
          </div>
    </>
  )
}

export default AddStation