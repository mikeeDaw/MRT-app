import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AddStation, Cards } from "../components/dashboard";
import Settings from "../components/dashboard/settings/Settings";
import SideNav from "../components/dashboard/sideNav/SideNav";
import TopNav from "../components/dashboard/sideNav/TopNav";
import Stations from "../components/dashboard/Stations/Stations";

const AdminDash = () => {
  //Array.from(coordInputs.current!.children)
  const [tab, setTab] = useState<String>(
    localStorage.getItem("adminPage") ?? "AddStation"
  );
  const [openTab, setOpenTab] = useState(false);
  const [header, setHeader] = useState("");

  // This useEffect is to stay on the current page when refreshed.
  useEffect(() => {
    localStorage.setItem("adminPage", String(tab));
  }, [tab]);

  const generateView = () => {
    switch (tab) {
      case "Card":
        return <Cards setHeader={setHeader} />;
      case "AddStation":
        return <AddStation setHeader={setHeader} />;
      case "Station":
        return <Stations setHeader={setHeader} />;
      case "Settings":
        return <Settings setHeader={setHeader} />;
    }
  };

  return (
    <>
      <div className="pb-10 md:pb-0 flex flex-row relative">
        <SideNav setTab={setTab} opened={openTab} openSide={setOpenTab} />
        <div className="flex flex-col w-full">
          <TopNav header={header} openSide={setOpenTab} side={openTab} />
          <div
            className="md:ms-[75px] mt-[60px] md:w-[calc(100%-75px)] min-h-[calc(100vh-60px)] lg:h-fit xl:h-[calc(100vh-60px)] relative"
            id="contentArea"
          >
            <AnimatePresence>{generateView()}</AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
