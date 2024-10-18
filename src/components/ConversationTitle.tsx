"use client";
import { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

export default function ConversationTitle({ title }) {
  const [isHover, setIsHover] = useState(false);
  const { isOptionClick, handleClickOption } = useSidebar();

  const handleHoverIn = () => {
    setIsHover(true);
  };
  const handleHoverOut = () => {
    setIsHover(false);
  };

  const optionClick = () => {
    handleClickOption(true);
  };

  return (
    <div
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
      className="relative"
    >
      <div className="flex items-center overflow-hidden hover:bg-[#212121] rounded-[8px] px-[8px] py-[8px] mr-[9px] cursor-pointer">
        <span className="text-[14px] text-[#ececec] font-roboto-regular flex-none">
          {title}
        </span>
        <div
          className={`z-[30] absolute right-[8px] ${
            isHover ? "bg-[#212121]" : "hidden"
          }`}
          onClick={optionClick}
        >
          <svg
            className="fill-current text-gray-400 hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M3 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
          </svg>
        </div>

        <div
          className={` ${
            isHover
              ? "absolute inset-y-0 right-[26px] w-[30px] bg-gradient-to-l from-[#212121] to-transparent"
              : "absolute inset-y-0 right-0 w-[30px] bg-gradient-to-l from-[#171717] to-transparent"
          }`}
        ></div>
        {isHover && (
          <div className="absolute inset-y-0 right-0 w-[30px] bg-[#212121] rounded-[8px]"></div>
        )}
      </div>

      {/*      <div className="absolute bg-[#2f2f2f] h-auto flex-col right-[-30px] rounded-[16px] border-[1px] border-[#444444] z-[999]">
        <div className="flex mt-[9px] mr-[9px] ml-[9px] p-[12px]">
          <div className="mr-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#e3e3e3"
                fill-rule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 6.414V15a1 1 0 1 1-2 0V6.414L8.707 8.707a1 1 0 0 1-1.414-1.414zM4 14a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-white">Bagikan</span>
          </div>
        </div>
        <div className="flex mr-[9px] ml-[9px] p-[12px]">
          <div className="mr-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#e3e3e3"
                fill-rule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 6.414V15a1 1 0 1 1-2 0V6.414L8.707 8.707a1 1 0 0 1-1.414-1.414zM4 14a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-white">Bagikan</span>
          </div>
        </div>
        <div className="flex mb-[9px] mr-[9px] ml-[9px] p-[12px]">
          <div className="mr-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#e3e3e3"
                fill-rule="evenodd"
                d="M11.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 6.414V15a1 1 0 1 1-2 0V6.414L8.707 8.707a1 1 0 0 1-1.414-1.414zM4 14a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-white">Bagikan</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
