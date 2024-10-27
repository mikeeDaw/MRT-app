import React from "react";

interface Props {
  href: string;
  text: string;
}

const Tabs: React.FC<Props> = ({ href, text }) => {
  return (
    <>
      <a
        href={href}
        className="block py-2 px-3 md:p-0 text-gray-900 rounded text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        {text}
      </a>
    </>
  );
};

export default Tabs;
