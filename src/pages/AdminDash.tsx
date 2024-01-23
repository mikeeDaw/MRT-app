import React, { useContext, useEffect, useRef, useState } from "react";
import { Navibar, SidebarNav, AddStation, Cards } from "../components/dashboard";
import EditStation from "../components/dashboard/EditStation";
import SideNav from "../components/dashboard/sideNav/SideNav";
import TopNav from "../components/dashboard/sideNav/TopNav";
import { Stations } from "../components";
import Settings from "../components/dashboard/settings/Settings";


const AdminDash = () => {

  //Array.from(coordInputs.current!.children)
  const [tab, setTab] = useState<String>(localStorage.getItem('adminPage') ?? 'AddStation');

  // This useEffect is to stay on the current page when refreshed.
  useEffect(() => {
    localStorage.setItem('adminPage',String(tab))
  },[tab])

  const generateView = () => {
    switch (tab) {
      case 'Card' : return <Cards/>
      case 'AddStation' : return <AddStation/>
      case 'Stations' : return <Stations />
      case 'Settings' : return <Settings />
    }
  }


  return (
    <>
      <div className="flex flex-row">
        <SideNav setTab={setTab}/>
        {/* <Navibar /> */}
        <div className="flex flex-col w-full">
            <TopNav />
          <div className="ms-0 w-full h-[calc(100vh-60px)] relative" id="contentArea">

            {generateView()}

          </div>
        </div>  
      </div>
    </>
  );
};

export default AdminDash;
