import React from "react";
import { Navbar, Sidebar } from "../components/dashboard";
import { Map, MapEvents } from '../components';
import { Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import Leaflet, {LatLngExpression} from 'leaflet'

const AdminDash = () => {

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


  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row">
          <Sidebar />
          <div className="ms-0 mt-[72px] sm:ms-[256px] w-full h-screen" id="contentArea">
            <div className="w-full h-screen">
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
        <MapEvents />
          </Map>
            </div>

          </div>
        </div>  
      </div>
    </>
  );
};

export default AdminDash;
