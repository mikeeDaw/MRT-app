import React, { useContext } from "react";
import QRCode from "react-qr-code";
import { TapMethod } from "./context/Context";

const QrArea = () => {
  const tapMeth = useContext(TapMethod);

  return (
    <div className="flex border-2 border-[#202758] p-6 rounded-b-xl flex-col justify-center items-center gap-3">
      {/* QR Scan Area */}
      <div className="rounded-xl pe-3 flex bg-[#202758] items-center">
        <div className="flex flex-col px-6 py-0 items-center text-white">
          <span className="text-white text-[45px] font-bold translate-y-[25%] bebas">
            SCAN
          </span>
          <span className="text-white text-[55px] font-bold translate-y-[-15%] bebas">
            ME!
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl">
          <QRCode
            size={100}
            value={JSON.stringify({
              mrtOnline: "s94jdIsBS032hu7",
              station: tapMeth.currStation,
              pass: tapMeth.pass,
            })}
            viewBox={`0 0 100 100`}
            fgColor="#202758"
          />
        </div>
      </div>
    </div>
  );
};

export default QrArea;
