import React from "react";
import UserSide from "./UserSide";
import AdminLog from "./AdminLog";

interface Props {
  setTabAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  tabAdmin: Boolean;
}

const DataArea: React.FC<Props> = ({ setTabAdmin, tabAdmin }) => {
  const generateTabContent = () => {
    if (tabAdmin) return <AdminLog />;
    else return <UserSide />;
  };

  return (
    <>
      <div
        className="absolute bg-white z-10 sm:right-0 md:right-14 md:w-[350px] lg:right-28 xl:right-44 pt-5 md:top-44 flex flex-col lg:w-96 border rounded-lg"
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
