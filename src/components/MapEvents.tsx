import Leaflet, { LeafletMouseEvent } from 'leaflet';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Marker, useMapEvents, Popup } from 'react-leaflet';
import { Red } from '../icons';
interface Props {
    setLongitude: Dispatch<SetStateAction<Number | undefined>>,
    setLatitude: Dispatch<SetStateAction<Number | undefined>>,
    setOldMarker : React.Dispatch<React.SetStateAction<Leaflet.Marker<any> | undefined>>
    removeLines : React.Dispatch<React.SetStateAction<Leaflet.LatLngExpression[][]>>,
    refreshChoice : React.Dispatch<React.SetStateAction<string[]>>,
    refNewPoly : React.Dispatch<React.SetStateAction<Leaflet.LatLngExpression[][]>>,
    refInitPoly : React.Dispatch<React.SetStateAction<any[]>>,
    oldMarker :  Leaflet.Marker<any> | undefined,
    createFlag : boolean

}
const MapEvents:React.FC<Props> = ({setLatitude, setLongitude, setOldMarker, oldMarker, removeLines, refreshChoice, refNewPoly, refInitPoly, createFlag}) => {


    let xcoor : number = 0
    let ycoor : number = 0
    let newMark: Leaflet.Marker | undefined = undefined;

    let LIcon = Leaflet.icon({
        iconUrl: Red,
        iconSize: [40, 40],
        iconAnchor: [25, 50],
      })

    let map = useMapEvents({
        click(e) {

          xcoor = e.latlng.lat
          ycoor = e.latlng.lng
          setLongitude(ycoor);
          setLatitude(xcoor);
          removeLines([])
          refreshChoice([])
          refInitPoly([])
          refNewPoly([])

            if(oldMarker != undefined) {
                map.removeLayer(oldMarker!);
            } 

            newMark = Leaflet.marker([xcoor,ycoor],{
                icon: LIcon
            }).addTo(map);
            setOldMarker(newMark)

            
        }
      });

      if(createFlag){
        map.removeLayer(oldMarker!)
      }
  
    return <></>
}

export default MapEvents