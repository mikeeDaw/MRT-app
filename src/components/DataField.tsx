import React from "react";

interface Props {
  title: string;
  data: string;
  icon: any;
}

const DataField: React.FC<Props> = ({ title, data, icon }) => {
  return (
    <div className="bg-slate-100 flex gap-3 justify-start items-center px-2 py-1.5 rounded-lg">
      <div className="justify-start">
        <img src={icon} alt="Icon" className="w-8" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm">{title}</span>
        <span className="text-sm">{data}</span>
      </div>
    </div>
  );
};

export default DataField;
