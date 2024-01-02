import Leaflet, { LatLngExpression, latLng } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { Red } from "../icons";
import Map from './Map'

const Stations = () => {
  // x , y
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
          // North Ave
        }
        <Marker key={1} position={[14.65617, 121.028032]}>
          <Popup>
            A pretty CSS3 spopup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={12}
          position={[14.6712702, 121.002032]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > North Ave. </span>',
          })}
        />
        {
          // Quezon Ave
        }
        <Marker key={2} position={[14.6428, 121.0345]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={22}
          position={[14.6579002, 121.0085]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > Quezon Ave. </span>',
          })}
        />
        {
          // Kamuning
        }
        <Marker key={3} position={[14.6344174623, 121.039349843]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={32}
          position={[14.6495176623, 121.013349843]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > Kamuning </span>',
          })}
        />
        {
          // Araneta Center - Cubao
        }
        <Marker key={4} position={[14.6183225267, 121.050621464]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={42}
          position={[14.6364227267, 121.024621464]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > Cubao </span>',
          })}
        />
        {
          // Santolan
        }
        <Marker key={5} position={[14.6046242482, 121.053864785]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={52}
          position={[14.6237244482, 121.027864785]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > Santolan </span>',
          })}
        />
        {
          // Ortigas
        }
        <Marker
          key={6}
          position={[14.5860943223, 121.054023117]}
          icon={Leaflet.icon({
            iconUrl: Red,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
          })}
        >
          <Popup offset={[0, -40]}>
            A pretty ORt popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={62}
          position={[14.6051945223, 121.028023117]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl" > Ortigas </span>',
          })}
        />

        {
          // Shaw
        }
        <Marker key={7} position={[14.575502698, 121.052208124]}>
          <Popup>
            A pretty CSS3 XXX. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={72}
          position={[14.596102898, 121.026208124]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Shaw </span>',
          })}
        />

        {
          // Boni
        }
        <Marker key={8} position={[14.5718, 121.0481]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={82}
          position={[14.5919002, 121.0221]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Boni </span>',
          })}
        />
        {
          // Guadalupe
        }
        <Marker key={9} position={[14.5667810662, 121.040613171]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={92}
          position={[14.5878812662, 121.014613171]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Guadalupe </span>',
          })}
        />
        {
          // Buendia
        }
        <Marker key={10} position={[14.5525194566, 121.033789865]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={102}
          position={[14.5786196566, 121.007789865]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Buendia </span>',
          })}
        />
        {
          // Ayala
        }
        <Marker key={11} position={[14.5426961625, 121.023269907]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={112}
          position={[14.5697963625, 120.997269907]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Ayala </span>',
          })}
        />
        {
          // Magallanes
        }
        <Marker key={12} position={[14.5384028464, 121.018206594]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={121}
          position={[14.5665030464, 120.992206594]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Guadalupe </span>',
          })}
        />
        {
          // Taft
        }
        <Marker key={13} position={[14.53584119, 121.00084333]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <Marker
          key={131}
          position={[14.56494139, 120.97484333]}
          icon={Leaflet.divIcon({
            className: "marker-label",
            html: '<span class="border-2 border-slate-500 py-0.5 w-[80px] block text-center bg-indigo-100 font-bold rounded-lg tracking-wide markLbl relative"> Taft Ave. </span>',
          })}
        />

        <Polygon positions={polyline} pathOptions={LineOpts} />
      </Map>
    </div>
  );
};

export default Stations;
