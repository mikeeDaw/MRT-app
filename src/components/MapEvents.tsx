import Leaflet, { LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react'
import { Marker, useMapEvents, Popup } from 'react-leaflet';
import { Red } from '../icons';

const MapEvents = () => {


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
          console.log(e.latlng.lat);
          console.log(e.latlng.lng);
          xcoor = e.latlng.lat
          ycoor = e.latlng.lng

            if(newMark != undefined) {
                map.removeLayer(newMark);
            } 

            newMark = Leaflet.marker([xcoor,ycoor],{
                icon: LIcon
            }).addTo(map);
        }
      });
  
    return <></>
}

export default MapEvents