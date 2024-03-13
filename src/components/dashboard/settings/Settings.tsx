import React, { useEffect, useState } from "react";
import SettingItem from "./SettingItem";
import { Middleware } from "../../../middleware/Middleware";
import { ToastContainer, toast } from "react-toastify";
import { StationMod } from "../../types/models";
const endpoint = process.env.REACT_APP_URL;

interface Props {
  setHeader: React.Dispatch<React.SetStateAction<string>>;
}

const Settings: React.FC<Props> = ({ setHeader }) => {
  const { getToken, logout } = Middleware();

  const [constants, setConstants] = useState<any>(undefined);
  const [editing, setEditing] = useState(false);
  const [maintEdit, setMaintEdit] = useState(false);
  const [stations, setStations] = useState<StationMod[]>([]);

  const [penalty, setPenalty] = useState(0);
  const [minFare, setMinFare] = useState(0);
  const [perKM, setPerKM] = useState(0);
  const [minLoad, setMinLoad] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [maintenance, setMaintenance] = useState(false);

  const checkFloatingStation = async () => {
    let result = false;
    await fetch(`${endpoint}/station/get/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
      .then(async (jason) => {
        if (jason.status === 200) {
          const data: StationMod[] = await jason.json();
          if (
            data.every((station) => {
              return station.connected.length !== 0;
            })
          )
            result = false;
          else result = true;
        } else {
          console.log("Error");
          logout();
        }
      })
      .catch((error) => {
        return result;
      });

    return result;
  };

  const getData = async () => {
    try {
      const response = await fetch(`${endpoint}/constants/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (jason) => {
        if (jason.status === 200) {
          const data = await jason.json();

          setConstants(data);
          setPenalty(data.penalty);
          setMinFare(data.minFare);
          setPerKM(data.farePerKM);
          setMinLoad(data.minLoad);
          setMaintenance(data.maintenance);
        } else {
          logout();
        }
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateConst = async () => {
    const updBody = {
      penalty: penalty,
      minFare: minFare,
      farePerKM: perKM,
      minLoad: minLoad,
    };

    if (penalty == 0 || minFare == 0 || perKM == 0 || minLoad == 0) {
      toast.error(`Invalid Input.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      const response = await fetch(`${endpoint}/constants/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(updBody),
      }).then(async (jason) => {
        if (jason.status === 200) {
          const data = await jason.json();
          setEditing(false);

          toast.success(`Update was Successful!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          console.log("Error");
          logout();
        }
      });
    }
  };

  const cancelConst = () => {
    setCancel(cancel + 1);
    setEditing(false);
  };

  const handleMaintenance = async () => {
    const hasFloating = await checkFloatingStation();

    if (hasFloating) {
      toast.error(`Connect Floating Stations First.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const response = await fetch(`${endpoint}/constants/maintenance`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({ maintenance: maintenance }),
    }).then(async (jason) => {
      if (jason.status === 200) {
        const data = await jason.json();
        console.log(data, data.data.maintenance, "dataaaa");
        setMaintEdit(false);
        getData();

        let message = "";
        if (data.data.maintenance) message = "System is now in Maintenance.";
        else message = "System is now Operational.";

        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (jason.status === 401) {
        toast.error(`There are Passengers Tapped in.`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        logout();
      }
    });
  };

  useEffect(() => {
    console.log(stations);
  }, [stations]);

  const checkOper = () => {
    if (maintenance) {
      setEditing(true);
    } else {
      toast.error(`System still in Operational Mode.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    setHeader("Fare Management");
    getData();
  }, []);

  return (
    <>
      <div className="absolute left-10">
        <ToastContainer className="" stacked limit={5} />
      </div>
      <div className="flex flex-col md:flex-row bg-slate-300 gap-5 h-full p-6">
        {/* Charges */}
        <div className="w-full md:w-5/12 lg:w-7/12 xl:w-4/12 bg-white h-fit px-4 py-6 rounded-lg flex flex-col gap-5">
          <div className="flex justify-between px-1 relative">
            <span className="font-bold"> Charges </span>
            {editing ? (
              <>
                <button
                  className="absolute right-12 top-[-7px] me-3 border p-2 rounded-full bg-[#e73030] border-[#e73030]"
                  id="constCanc"
                  onClick={cancelConst}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
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
                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                        strokeWidth="2"
                        stroke="#FFFFFF"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <button
                  className="absolute right-0 top-[-7px] me-3 border p-2 rounded-full bg-[#10c78c] border-[#10c78c]"
                  id="constConf"
                  onClick={updateConst}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        stroke="#ffffff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  className="absolute right-0 top-[-7px] me-3 border p-2 rounded-full border-[#b1b1b1]"
                  id="constEdit"
                  onClick={checkOper}
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 translate-x-[-1px]"
                    fill="none"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        fillRule="evenodd"
                        d="M17.586 2a2 2 0 0 1 2.828 0L22 3.586a2 2 0 0 1 0 2.828L20.414 8 16 3.586 17.586 2zm-3 3-5 5A2 2 0 0 0 9 11.414V13a2 2 0 0 0 2 2h1.586A2 2 0 0 0 14 14.414l5-5L14.586 5z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 14H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4"
                      ></path>
                    </g>
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col h-full gap-2">
            {constants && (
              <>
                <SettingItem
                  title="Penalty Fee"
                  price={constants.penalty}
                  edit={editing}
                  setter={setPenalty}
                  cancel={cancel}
                />
                <SettingItem
                  title="Minimum Fare"
                  price={constants.minFare}
                  edit={editing}
                  setter={setMinFare}
                  cancel={cancel}
                />
                <SettingItem
                  title="Fare Per KM"
                  price={constants.farePerKM}
                  edit={editing}
                  setter={setPerKM}
                  cancel={cancel}
                />
                <SettingItem
                  title="Minimum Load"
                  price={constants.minLoad}
                  edit={editing}
                  setter={setMinLoad}
                  cancel={cancel}
                />
              </>
            )}
          </div>
        </div>
        {/* Maintenance */}
        <div className="w-full md:w-6/12 lg:w-4/12 h-fit bg-white rounded-lg py-6 px-4 flex flex-col gap-5">
          <div className="flex justify-between px-1 relative">
            <span className="font-bold"> Maintenance </span>
            {maintEdit ? (
              <>
                <button
                  className="absolute right-12 top-[-7px] me-3 border p-2 rounded-full bg-[#e73030] border-[#e73030]"
                  id="constCancMaint"
                  onClick={() => {
                    setMaintenance(constants.maintenace);
                    setMaintEdit(false);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5"
                    xmlns="http://www.w3.org/2000/svg"
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
                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                        strokeWidth="2"
                        stroke="#FFFFFF"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <button
                  className="absolute right-0 top-[-7px] me-3 border p-2 rounded-full bg-[#10c78c] border-[#10c78c]"
                  id="constConfMaint"
                  onClick={handleMaintenance}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        stroke="#ffffff"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  className="absolute right-0 top-[-7px] me-3 border p-2 rounded-full border-[#b1b1b1]"
                  id="constEdit"
                  onClick={() => setMaintEdit(true)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 translate-x-[-1px]"
                    fill="none"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fill="#000000"
                        fillRule="evenodd"
                        d="M17.586 2a2 2 0 0 1 2.828 0L22 3.586a2 2 0 0 1 0 2.828L20.414 8 16 3.586 17.586 2zm-3 3-5 5A2 2 0 0 0 9 11.414V13a2 2 0 0 0 2 2h1.586A2 2 0 0 0 14 14.414l5-5L14.586 5z"
                        clipRule="evenodd"
                      ></path>
                      <path
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 14H5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4"
                      ></path>
                    </g>
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="flex w-full border justify-between py-2 px-4 items-center"
              style={{ boxShadow: "1px 1px 5px -3px #797979" }}
            >
              <span className="text-sm"> Maintenance Mode </span>
              <div className="flex">
                <button
                  className={
                    "border px-2.5 py-1 text-sm disabled:opacity-75 transition-all " +
                    (!maintenance
                      ? "border-[#202758] bg-[#202758] text-white"
                      : "border-[#B7B7B7] text black bg-white")
                  }
                  disabled={maintEdit ? false : true}
                  onClick={() => setMaintenance(false)}
                >
                  OFF
                </button>
                <button
                  className={
                    "border px-2.5 py-1 text-sm disabled:opacity-75 transition-all " +
                    (maintenance
                      ? "border-[#00B38C] bg-[#00B38C] text-white"
                      : "border-[#B7B7B7] text black bg-white")
                  }
                  disabled={maintEdit ? false : true}
                  onClick={() => setMaintenance(true)}
                >
                  ON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
