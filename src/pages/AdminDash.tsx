import React, { useContext, useEffect, useRef, useState } from "react";
import { Navibar, SidebarNav, AddStation, Cards } from "../components/dashboard";
import EditStation from "../components/dashboard/EditStation";
import SideNav from "../components/dashboard/sideNav/SideNav";
import TopNav from "../components/dashboard/sideNav/TopNav";
import Stations  from "../components/dashboard/Stations/Stations";
import Settings from "../components/dashboard/settings/Settings";
import { AnimatePresence } from "framer-motion";


const AdminDash = () => {

  //Array.from(coordInputs.current!.children)
  const [tab, setTab] = useState<String>(localStorage.getItem('adminPage') ?? 'AddStation');
  const [openTab, setOpenTab] = useState(false)


  // This useEffect is to stay on the current page when refreshed.
  useEffect(() => {
    localStorage.setItem('adminPage',String(tab))
  },[tab])

  const generateView = () => {
    switch (tab) {
      case 'Card' : return <Cards/>
      case 'AddStation' : return <AddStation/>
      case 'Station' : return <Stations />
      case 'Settings' : return <Settings />
    }
  }


  return (
    <>
      <div className="pb-10 md:pb-0 flex flex-row">
        <SideNav setTab={setTab} opened={openTab} openSide={setOpenTab} />
        <div className="flex flex-col w-full">
            <TopNav openSide={setOpenTab} side={openTab} />
          <div className="ms-0 w-full min-h-[calc(100vh-60px)] md:h-[calc(100vh-60px)] relative" id="contentArea">
            <AnimatePresence>
              {generateView()}
            </AnimatePresence>
          </div>
        </div>  
      </div>
    </>
  );
};

export default AdminDash;
