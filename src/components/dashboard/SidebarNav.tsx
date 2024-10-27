import React from "react";
import SideTabs from "./SideTabs";
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiCreditCard,
  HiCash,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiMap,
  HiTable,
  HiUser,
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

interface Props {
  setTab : React.Dispatch<React.SetStateAction<String>>
}
const SidebarNav : React.FC<Props> = ({setTab}) => {

  return (
    <>
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Collapse
              icon={HiMap}
              label="Stations"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
              }}
            >
              <Sidebar.Item href="#" onClick={() => {console.log('changed'); setTab('AddStation')}} >Add Station</Sidebar.Item>
              <Sidebar.Item href="#">Edit Stations</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#" icon={HiCreditCard} onClick={() => {console.log('changed'); setTab('Card')}}>
              Beep Cards
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiCash}>
              Transactions
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>                 
      </Sidebar>
      </>
  );
};

export default SidebarNav;
