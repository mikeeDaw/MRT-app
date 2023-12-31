import React from "react";

interface Props {
  svg: JSX.Element;
  href: string;
  text: string;
}

const SideTabs: React.FC<Props> = ({ svg, href, text }) => {
  return (
    <>
      <a
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {svg}
        <span className="ms-3">{text}</span>
      </a>
    </>
  );
};

export default SideTabs;
