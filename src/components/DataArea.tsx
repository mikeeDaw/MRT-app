import React, { useContext } from "react";
import UserSide from "./UserSide";
import AdminLog from "./AdminLog";
import { TapMethod } from "./context/Context";
import Leaflet, { LatLngExpression, latLng } from "leaflet";

interface Props {
  setTabAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  allStations : any[],
  tabAdmin: Boolean;
  setRoutePoly: React.Dispatch<React.SetStateAction<Leaflet.LatLngExpression[][]>>
}

const DataArea: React.FC<Props> = ({ setTabAdmin,allStations,tabAdmin,setRoutePoly}) => {

  const tapMeth = useContext(TapMethod)

  const generateTabContent = () => {
    let myStation = allStations.find((stat) => stat.name.toUpperCase() == tapMeth.currStation.toUpperCase())
    if (tabAdmin) return <AdminLog />;
    else return <UserSide theStation={allStations} currStatObj={myStation} currStat={tapMeth.currStation} tap={tapMeth.pass} setRoutePoly={setRoutePoly} />;
  };

  return (
    <>
      <div
        className="absolute bg-white z-10 top-[670px] left-1/2 md:left-auto translate-x-[-50%] md:translate-x-0 w-[350px] sm:right-0 md:right-14 md:w-[350px] lg:right-26 xl:right-44 pt-5 md:top-1/2 md:translate-y-[-50%] flex flex-col lg:w-96 border rounded-lg"
        style={{ boxShadow: "0 0 13px 2px #b3b3b3" }}
      >
        <div className="bg-slate-400 flex flex-row pt-2 ps-2 gap-1">
          <div
            className={
              "bg-white px-3 py-1 z-0 rounded-t-lg border-2 relative border-b-0 text-sm cursor-pointer " +
              (tabAdmin ? "opacity-80" : "border-[#202758]")
            }
            onClick={() => setTabAdmin(!tabAdmin)}
            id="tabUser"
          >
            Ticketing
            <span
              className={
                "absolute left-0 top-[25px] right-[0] bottom-[-3px] bg-white " +
                (tabAdmin ? "opacity-0" : "opacity-1")
              }
            >
              {" "}
            </span>
          </div>
          <div
            className={
              "bg-white px-3 py-1 border-2 border-b-0 rounded-t-lg text-sm text-center cursor-pointer relative " +
              (tabAdmin ? "border-[#202758]" : "opacity-80 ")
            }
            onClick={() => setTabAdmin(!tabAdmin)}
            id="tabAdmin"
          >
            Admin Login
            <span
              className={
                "absolute left-0 top-[25px] right-[0] bottom-[-3px] bg-white " +
                (tabAdmin ? "opacity-1" : "opacity-0")
              }
            >
              {" "}
            </span>
          </div>
        </div>
        {generateTabContent()}
      </div>
    </>
  );
};

export default DataArea;
