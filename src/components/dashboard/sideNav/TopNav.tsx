import React, { useEffect, useState } from "react";

interface Props {
  openSide: React.Dispatch<React.SetStateAction<boolean>>;
  side: boolean;
  header: string;
}

const TopNav: React.FC<Props> = ({ openSide, side, header }) => {
  const [sm, setSm] = useState(false);

  window.addEventListener("resize", (e) => {
    if (window.innerWidth < 768) {
      setSm(true);
    } else {
      setSm(false);
    }
  });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSm(true);
    }
  }, []);

  return (
    <>
      <div
        className="h-[60px] w-full flex items-center justify-between ps-5 pe-10 fixed lg:w-[calc(100%-75px)] bg-white md:ms-[75px] z-20"
        style={{ boxShadow: "3px 1px 6px -1px #c9c9c9" }}
      >
        {sm && (
          <button className="w-6 absolute" onClick={() => openSide(!side)}>
            <svg
              viewBox="0 0 24 24"
              fill="#000 "
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="#414141"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        )}

        <span className="ps-10 md:ps-0 font-bold"> {header}</span>
      </div>
    </>
  );
};

export default TopNav;
