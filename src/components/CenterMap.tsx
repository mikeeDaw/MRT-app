import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'

interface Props {
    lat : number,
    lng : number,
    zoom : number
}
const CenterMap: React.FC<Props> = ({lat,lng,zoom}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat,lng],zoom)
    })
  return null
}

export default CenterMap