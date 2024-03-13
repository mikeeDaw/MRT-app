import React, { useContext, useEffect, useState } from "react";
import { Map, MapEvents, InputField } from "..";
import { Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import Leaflet, { LatLngExpression } from "leaflet";
import { Label, Select } from "flowbite-react";
import { Middleware } from "../../middleware/Middleware";
import { motion } from "framer-motion";
import { introPage } from "../../constants/animate";
import { StationMod } from "../types/models";
import { connected } from "process";
import { ToastContainer, toast } from "react-toastify";
import { TapMethod } from "../context/Context";
import "react-toastify/dist/ReactToastify.css";

const endpoint = process.env.REACT_APP_URL;

interface Props {
  setHeader: React.Dispatch<React.SetStateAction<string>>;
}

const AddStation: React.FC<Props> = ({ setHeader }) => {
  const tapMeth = useContext(TapMethod);
  const { getToken } = Middleware(tapMeth.currStation);

  const LineOpts = { color: "#0E137D", weight: 5 };

  // States for stations from DB
  const [stations, setStations] = useState<StationMod[]>([]);
  const [polyLine, setPolyLine] = useState<LatLngExpression[][]>([]);
  // State for clicking on the map
  const [latitude, setLatitude] = useState<Number | undefined>(undefined);
  const [longitude, setLongitude] = useState<Number | undefined>(undefined);
  const [oldMarker, setOldMarker] = useState<Leaflet.Marker | undefined>(
    undefined
  );
  const [newConns, setNewConns] = useState(0);
  const [createdFlag, setCreatedFlag] = useState(false);
  const [statCoord, setStatCoord] = useState<LatLngExpression[]>([]);
  // States for input fields
  const [chosenStat, setChosenStat] = useState<string[]>([]);
  const [statName, setStatName] = useState("");
  const [statCode, setStatCode] = useState("");
  // State for new Polyline
  const [initNewPoly, setinitNewPoly] = useState<any[]>([]);
  const [newPoly, setNewPoly] = useState<LatLngExpression[][]>([]);

  const getTheStations = async () => {
    setCreatedFlag(false);
    const response = await fetch(`${endpoint}/station/get/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (jason) => {
        if (jason.status === 200) {
          const data = await jason.json();
          setStations(data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const addNewStation = async () => {
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    const codePattern = /^[a-zA-Z0-9]{5}$/;

    if (
      !namePattern.test(statName) ||
      !codePattern.test(statCode) ||
      !latitude ||
      !longitude
    ) {
      toast.error(`Invalid Input`, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      let operational = false;
      try {
        const maint = await fetch(`${endpoint}/constants/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (jason) => {
          if (jason.status === 200) {
            const data = await jason.json();
            if (!data.maintenance) {
              toast.error(`System is Operational.`, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              operational = true;
            }
          }
        });
      } catch (error: any) {
        return console.log(error.message);
      }

      if (operational) return;

      const response = await fetch(`${endpoint}/station/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify({
          name: statName.toUpperCase(),
          code: statCode,
          coordinates: { x: latitude, y: longitude },
          connected: chosenStat,
        }),
      })
        .then(async (jason) => {
          if (jason.status === 200) {
            getTheStations();
            setChosenStat([]);
            setStatName("");
            setStatCode("");
            setLatitude(undefined);
            setLongitude(undefined);
            setCreatedFlag(true);
            setNewPoly([]);

            toast.success(
              `${titleCase(String(statName))} Station was Created!`,
              {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              }
            );
          } else {
            toast.error(`Duplicate Station Name or Code`, {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    getTheStations();
    setHeader("Create a Station");
  }, []);

  // For Polyline & LatLng
  useEffect(() => {
    let poly: any[] = [];
    stations.forEach((station: any) => {
      let stationPoint = Leaflet.latLng(
        station.coordinates.x,
        station.coordinates.y
      );

      station.connected.forEach((code: String) => {
        let connect: any[] = [
          Leaflet.latLng(station.coordinates.x, station.coordinates.y),
        ];
        let conStat = stations.find((item: any) => item.code == code);
        if (conStat) {
          connect.push(
            Leaflet.latLng(
              Number(conStat!.coordinates.x),
              Number(conStat!.coordinates.y)
            )
          );
        }
        poly.push(connect);
      });

      setStatCoord([...statCoord, stationPoint]);
    });
    setPolyLine(poly);
  }, [stations]);

  let sKey = 0;
  let count = 1;

  const xChange = (e: any) => {
    const re = /^[0-9.\b]+$/;
    const value = e.target.value;
    if (value === "" || re.test(value)) {
      setLongitude(value);
    }
    console.log(statCoord);
  };

  const yChange = (e: any) => {
    const re = /^[0-9.\b]+$/;
    const value = e.target.value;
    console.log(e);
    if (value === "" || re.test(value)) {
      setLatitude(value);
    }
  };

  const titleCase = (inputString: String) => {
    return inputString.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  };

  const connectClick = (code: string, sid: number) => {
    let targetStation = stations.find((item) => item.code == code);

    let distance = Leaflet.latLng(
      Number(latitude),
      Number(longitude)
    ).distanceTo(
      Leaflet.latLng(
        Number(targetStation?.coordinates.x),
        Number(targetStation?.coordinates.y)
      )
    );

    if (!(distance < 500)) {
      if (chosenStat.find((item) => item == code)) {
        setChosenStat(chosenStat.filter((item) => item != code));
        setinitNewPoly(initNewPoly.filter((item) => item.id != sid));
      } else {
        setChosenStat([...chosenStat, code]);
        setinitNewPoly([
          ...initNewPoly,
          {
            id: sid,
            coords: {
              x: Number(targetStation?.coordinates.x),
              y: Number(targetStation?.coordinates.y),
            },
          },
        ]);
      }
    } else {
      toast.error(
        `${titleCase(String(targetStation?.name))} is within 500 meters.`,
        {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  useEffect(() => {
    let temp = initNewPoly.map((item) => {
      return [
        Leaflet.latLng(Number(latitude), Number(longitude)),
        Leaflet.latLng(item.coords.x, item.coords.y),
      ];
    });
    setNewPoly([...temp]);
  }, [initNewPoly]);

  const [sm, setSm] = useState(false);
  const [addWindow, setAddWindow] = useState(true);

  window.addEventListener("resize", (e) => {
    if (window.innerWidth < 768) {
      setSm(true);
    } else {
      setSm(false);
    }
  });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSm(true);
    }
  }, []);

  return (
    <motion.div className="relative w-full h-screen">
      {/* Map Section */}
      <div className="w-full h-[100vh] top-0 left-0 z-0 absolute">
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
          {stations.map((stat) => {
            sKey += 1;
            return (
              <Marker
                key={sKey}
                position={[
                  Number(stat.coordinates.x),
                  Number(stat.coordinates.y),
                ]}
              >
                <Popup>{titleCase(stat.name) + " Station"}</Popup>
              </Marker>
            );
          })}
          <Polygon positions={polyLine ?? []} pathOptions={LineOpts} />
          <Polygon
            positions={newPoly ?? []}
            pathOptions={{ color: "#00896b", weight: 5, dashArray: "20 20" }}
          />
          <MapEvents
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setOldMarker={setOldMarker}
            oldMarker={oldMarker}
            removeLines={setNewPoly}
            refreshChoice={setChosenStat}
            refNewPoly={setNewPoly}
            refInitPoly={setinitNewPoly}
            createFlag={createdFlag}
            setCreateFlag={setCreatedFlag}
          />
        </Map>
      </div>
      <div className="absolute left-10">
        <ToastContainer className="toastMsg" stacked />
      </div>

      {!addWindow && sm && (
        <button
          key={"addWindow"}
          className="absolute z-10 bg-white ps-2 pe-2 py-2 right-0 top-24 rounded-tl-xl rounded-bl-xl"
          onClick={() => setAddWindow(!addWindow)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 rotate-180"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L5.70711 4.29289ZM12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289C10.9024 4.68342 10.9024 5.31658 11.2929 5.70711L17.5858 12L11.2929 18.2929C10.9024 18.6834 10.9024 19.3166 11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L12.7071 4.29289Z"
                fill="#2d2d2d"
              ></path>{" "}
            </g>
          </svg>
        </button>
      )}

      {/* Add Station Section */}
      <motion.div
        {...introPage}
        className={
          "absolute md:right-16 xl:right-28 top-24 bg-white z-10 p-5 pb-4 w-[320px] md:w-[370px] rounded-xl transition-all " +
          (addWindow ? "right-2" : "right-[-100%]")
        }
        style={
          addWindow
            ? { boxShadow: "0 0 10px -3px #474747" }
            : { ...{ boxShadow: "0 0 10px -3px #474747" }, display: "none" }
        }
      >
        <div className="flex flex-col">
          {sm && (
            <button
              className="absolute right-6"
              onClick={() => setAddWindow(!addWindow)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L10.5858 12L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L5.70711 4.29289ZM12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289C10.9024 4.68342 10.9024 5.31658 11.2929 5.70711L17.5858 12L11.2929 18.2929C10.9024 18.6834 10.9024 19.3166 11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L12.7071 4.29289Z"
                    fill="#2d2d2d"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          )}
          <span> Add New Station </span>
          <div className="max-h-[270px] overflow-y-scroll scrollbar-hide">
            <div className="flex gap-3 mt-4 h-[44px]">
              <InputField
                forImg={false}
                textIcon="X"
                placeholder="12.54704"
                inpValue={String(longitude)}
                setter={xChange}
                onlyRead={true}
              />

              <InputField
                forImg={false}
                textIcon="Y"
                placeholder="14.5643"
                inpValue={String(latitude)}
                setter={yChange}
                onlyRead={true}
              />
            </div>

            <input
              type="email"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mt-1"
              placeholder="Station Name"
              value={statName}
              onChange={(e) => setStatName(e.target.value)}
            ></input>

            <input
              type="code"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 mt-2"
              placeholder="Station Code"
              value={statCode}
              onChange={(e) => setStatCode(e.target.value.toUpperCase())}
            ></input>

            <span className="mt-3 mb-2 block"> Connected To: </span>

            <div className="flex flex-wrap w-full justify-between">
              {stations.map((stat, index) => {
                let flag = chosenStat.find((item) => item == stat.code);
                return (
                  <>
                    <div className="w-1/3 px-1 mb-1.5">
                      <button
                        className={
                          "border w-full rounded-full flex py-1.5 justify-start items-center gap-1.5 px-2 " +
                          (flag
                            ? "border-[#25a135] bg-[#b6ffbf]"
                            : " border-[#565d8d] bg-slate-200 ")
                        }
                        onClick={() => {
                          connectClick(String(stat.code), index);
                        }}
                        disabled={latitude ? false : true}
                      >
                        <span
                          className={
                            "p-1.5 rounded-full " +
                            (flag ? "bg-[#25a135]" : "bg-slate-400")
                          }
                        ></span>
                        <span className="text-xs truncate">
                          {" "}
                          {titleCase(stat.name)}
                        </span>
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="text-end mt-3">
            <button
              className="bg-[#202758] px-4 text-white py-1 rounded-xl"
              onClick={addNewStation}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddStation;
