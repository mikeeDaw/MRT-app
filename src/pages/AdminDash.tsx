import React, { useEffect, useRef, useState } from "react";
import { Navibar, SidebarNav, AddStation, Cards } from "../components/dashboard";
import EditStation from "../components/dashboard/EditStation";


const AdminDash = () => {

  //Array.from(coordInputs.current!.children)
  const [tab, setTab] = useState<String>(localStorage.getItem('adminPage') ?? 'AddStation');

  // This useEffect is to stay on the current page when refreshed.
  useEffect(() => {
    localStorage.setItem('adminPage',String(tab))
  },[tab])

  console.log(tab)
  const generateView = () => {
    switch (tab) {
      case 'Card' : return <Cards/>
      case 'AddStation' : return <AddStation/>
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <Navibar />
        <div className="flex flex-row">
          <SidebarNav setTab={setTab}/>
          <div className="ms-0 w-full h-[calc(100vh-60px)] relative" id="contentArea">

            {generateView()}

          </div>
        </div>  
      </div>
    </>
  );
};

export default AdminDash;
