import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  title: string;
  price: number;
  edit: Boolean;
  setter: React.Dispatch<React.SetStateAction<number>>;
  cancel?: Number;
}

const SettingItem: React.FC<Props> = ({
  title,
  price,
  edit,
  setter,
  cancel = 0,
}) => {
  const [val, setVal] = useState(price);
  const [width, setWidth] = useState(30);

  const span = useRef<any>();

  useEffect(() => {
    setVal(price);
  }, [cancel]);

  useEffect(() => {
    setWidth(span.current.offsetWidth + 5);
  }, [val]);

  const priceChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    const value = e.target.value;
    console.log(e);
    if ((value === "" || re.test(value)) && value < 2001) {
      setVal(Number(value));
      setter(Number(value));
    } else {
      toast.error(`Please Enter a digit.`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div
        className="flex w-full border justify-between py-2 px-4 items-center"
        style={{ boxShadow: "1px 1px 5px -3px #797979" }}
      >
        <span className="text-sm"> {title} </span>
        <div className="flex justify-between gap-2">
          <span
            id="hide"
            className="absolute pointer-events-none opacity-0"
            ref={span}
          >
            {" "}
            {val}
          </span>
          <span
            className={
              "text-center " + (edit ? "text-[#00B38C] border-[#00B38C]" : "")
            }
          >
            {" "}
            ₱{" "}
          </span>
          <input
            type="text"
            name="val[]"
            value={val}
            className={
              "p-0 border-none min-w-[20px] max-w-[125px] text-center chargesInp " +
              (edit ? "text-[#00B38C] border-[#00B38C]" : "")
            }
            onChange={(e) => priceChange(e)}
            style={{ width: width }}
            disabled={Boolean(!edit)}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export default SettingItem;
