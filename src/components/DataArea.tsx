import * as Realm from "realm-web";
import React, { useContext, useEffect, useState } from "react";
import UserSide from "./UserSide";
import AdminLog from "./AdminLog";
import { TapMethod } from "./context/Context";
import Leaflet, { LatLngExpression, latLng } from "leaflet";
import QrArea from "./QrArea";
import {
  createGraph,
  findLongestPath,
  maxPathDistance,
} from "../constants/pathing";
const endpoint = process.env.REACT_APP_URL;

interface Props {
  setTabAdmin: React.Dispatch<React.SetStateAction<string>>;
  allStations: any[];
  tabAdmin: string;
  setRoutePoly: React.Dispatch<
    React.SetStateAction<Leaflet.LatLngExpression[][]>
  >;
}

const DataArea: React.FC<Props> = ({
  setTabAdmin,
  allStations,
  tabAdmin,
  setRoutePoly,
}) => {
  const tapMeth = useContext(TapMethod);
  const [maintenance, setMaintenance] = useState(false);
  const [constants, setConstants] = useState<any>({});
  const [mobileBody, setMobileBody] = useState<any>({});
  const [mobileChange, setMobileChange] = useState<any>();

  /* For DB Listeners */
  const [mongoapp, setMongoapp] =
    useState<
      Realm.App<
        globalThis.Realm.DefaultFunctionsFactory &
          globalThis.Realm.BaseFunctionsFactory,
        SimpleObject
      >
    >();

  // Creation of Anonymous Users
  useEffect(() => {
    const exist = Realm.App.getApp("application-0-psnff");
    if (exist) {
      setMongoapp(exist);
    } else {
      setMongoapp(new Realm.App({ id: "application-0-psnff" }));
    }
  }, []);

  useEffect(() => {
    const getConstants = async () => {
      // Get the Prices in Constants Collection
      const prices = await fetch("http://localhost:4000/constants/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (jason) => {
          if (jason.status === 200) {
            const data = await jason.json();
            setConstants(data);
          }
        })
        .catch((error) => console.log(error.message));
    };
    getConstants();
  }, []);

  const [user, setUser] = useState<Realm.User>();
  const [events, setEvents] = useState<
    globalThis.Realm.Services.MongoDB.ChangeEvent<any>[]
  >([]);

  const [mobileCollection, setMobileCollection] = useState<
    globalThis.Realm.Services.MongoDB.MongoDBCollection<any> | undefined
  >();
  const [constCollection, setConstCollection] = useState<
    globalThis.Realm.Services.MongoDB.MongoDBCollection<any> | undefined
  >();

  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      if (mongoapp) {
        if (!mongoapp.currentUser) {
          const user = await mongoapp.logIn(Realm.Credentials.anonymous());
          setUser(user);
        } else {
          setUser(mongoapp.currentUser);
        }

        // Connect to the database
        const mongodb = mongoapp.currentUser?.mongoClient("mongodb-atlas");

        const collection = mongodb?.db("Ticketing").collection("constants");
        const mobileCollect = mongodb?.db("Ticketing").collection("mobileTap");
        setMobileCollection(mobileCollect);
        setConstCollection(collection);
      }
    };

    login();
  }, [mongoapp]);

  // Tap Listener
  useEffect(() => {
    const mobileListen = async () => {
      if (mobileCollection) {
        for await (const change of mobileCollection.watch()) {
          console.log("here", change);
          setMobileChange(change);
        }
      }
    };
    mobileListen();
  }, [mobileCollection]);

  // useEffect(() => {
  //   const mobileTap = async () => {
  //     if (mobileChange) {
  //       if (mobileChange.operationType === "replace") {
  //         const newDoc = mobileChange.fullDocument;
  //         console.log(newDoc);
  //         if (tapMeth.pass === "in") {
  //           if (!newDoc.tapped) {
  //             const response = await fetch(`${endpoint}/beep/tapIn`, {
  //               method: "PATCH",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 uid: newDoc.uid,
  //                 origin: tapMeth.currStation.toUpperCase(),
  //               }),
  //             }).then(async (jason) => {
  //               if (jason.status === 200) {
  //                 const data = await jason.json();
  //                 await fetch("http://10.200.52.52:4000/mobile/tapIn", {
  //                   method: "PATCH",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                   body: JSON.stringify(data),
  //                 }).then(async (jason) => {
  //                   if (jason.status === 200) {
  //                     return await jason.json();
  //                   }
  //                 });
  //                 console.log(data);
  //                 //Tapped IN
  //               } else if (jason.status === 401) {
  //                 // Insufficient balance
  //               }
  //             });
  //           } else {
  //             // Your Are already tapped in.
  //             console.log("already Tappped");
  //           }
  //         } else if (tapMeth.pass === "out" && newDoc.tapped) {
  //           console.log("pasok");

  //           let myStation = allStations.find(
  //             (stat) =>
  //               stat.name.toUpperCase() == tapMeth.currStation.toUpperCase()
  //           );
  //           // Get the shortest path & the distance
  //           const grap = createGraph(allStations);
  //           let originStation = allStations.find(
  //             (item) => item.name.toUpperCase() === newDoc.origin.toUpperCase()
  //           );
  //           if (grap) {
  //             let path = findLongestPath(
  //               originStation.code,
  //               String(myStation.code),
  //               grap
  //             );
  //             let distansya = maxPathDistance(path.path, grap);
  //             let Totaldist = Math.floor(distansya);
  //             let totalPrice =
  //               Math.floor(distansya) * constants.farePerKM === 0
  //                 ? constants.minFare
  //                 : Math.floor(distansya) * constants.farePerKM;
  //             console.log("FINAL:", constants, totalPrice, Totaldist);
  //             // Save data to the database
  //             const pricey = Totaldist! < 2 ? constants.minFare : totalPrice;
  //             const response = await fetch(`${endpoint}/beep/tapOut`, {
  //               method: "PATCH",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 uid: newDoc.uid,
  //                 desc: `${newDoc.origin.toUpperCase()} - ${tapMeth.currStation.toUpperCase()}`,
  //                 balance: newDoc.balance,
  //                 price: pricey,
  //               }),
  //             }).then(async (jason) => {
  //               if (jason.status === 200) {
  //                 const updated = await jason.json();
  //                 console.log(updated, "updated...");
  //                 await fetch("http://10.200.52.52:4000/mobile/tapIn", {
  //                   method: "PATCH",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                   body: JSON.stringify(updated),
  //                 }).then(async (jason) => {
  //                   if (jason.status === 200) {
  //                     return await jason.json();
  //                   }
  //                 });
  //               }
  //             });
  //           }
  //         } else {
  //           console.log("Wala");
  //         }
  //       }
  //     }
  //   };
  //   mobileTap();
  // }, [mobileChange]);

  // Maintenance Listener
  useEffect(() => {
    const constantListen = async () => {
      if (constCollection) {
        for await (const change of constCollection.watch()) {
          if (change.operationType === "update") {
            setMaintenance(change.fullDocument.maintenance);
          }
          //setEvents((events) => [...events, change]);
        }
      }
    };
    constantListen();
  }, [constCollection]);

  const generateTabContent = () => {
    let myStation = allStations.find(
      (stat) => stat.name.toUpperCase() == tapMeth.currStation.toUpperCase()
    );
    switch (tabAdmin) {
      case "Login":
        return <AdminLog />;
      case "Ticketing":
        return (
          <UserSide
            theStation={allStations}
            currStatObj={myStation}
            currStat={tapMeth.currStation}
            maintenance={maintenance}
            setMaintenance={setMaintenance}
            tap={tapMeth.pass}
            setRoutePoly={setRoutePoly}
          />
        );
      case "QR":
        return <QrArea />;
    }
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
              (tabAdmin === "Ticketing" ? "border-[#202758]" : "opacity-80")
            }
            onClick={() => setTabAdmin("Ticketing")}
            id="tabUser"
          >
            Ticketing
            <span
              className={
                "absolute left-0 top-[25px] right-[0] bottom-[-3px] bg-white " +
                (tabAdmin === "Ticketing" ? "opacity-1" : "opacity-0")
              }
            />
          </div>

          <div
            className={
              "bg-white px-3 py-1 border-2 border-b-0 rounded-t-lg text-sm text-center cursor-pointer relative " +
              (tabAdmin === "QR" ? "border-[#202758]" : "opacity-80 ")
            }
            onClick={() => setTabAdmin("QR")}
            id="tabAdmin"
          >
            QR Tap
            <span
              className={
                "absolute left-0 top-[25px] right-[0] bottom-[-3px] bg-white " +
                (tabAdmin === "QR" ? "opacity-1" : "opacity-0")
              }
            >
              {" "}
            </span>
          </div>

          <div
            className={
              "bg-white px-3 py-1 border-2 border-b-0 rounded-t-lg text-sm text-center cursor-pointer relative " +
              (tabAdmin === "Login" ? "border-[#202758]" : "opacity-80 ")
            }
            onClick={() => setTabAdmin("Login")}
            id="tabAdmin"
          >
            Admin Login
            <span
              className={
                "absolute left-0 top-[25px] right-[0] bottom-[-3px] bg-white " +
                (tabAdmin === "Login" ? "opacity-1" : "opacity-0")
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
