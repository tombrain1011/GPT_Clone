"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { useConversation } from "@/contexts/ConversationContext";
import ConversationTitle from "./ConversationTitle";
import PricingCardMobile from "./PricingCardMobile";
import Image from "next/image";

export default function SidebarMobile() {
  const {
    isOpen,
    isContentHidden,
    toggleSidebar,
    isOptionClick,
    handleClickOption,
    toggleCloseSidebarMobile,
    isOpenMobileView,
  } = useSidebar();
  const { allConversationContext } = useConversation();
  const conversationRef = useRef(null);
  const sidebarRef = useRef(null);
  const popUpRef = useRef(null);
  const profileOptionRef = useRef(null);
  const avatarButton = useRef(null);

  const [isHoverLocation, setIsHoverLocation] = useState(0);
  const [optionPosition, setOptionPosition] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [showProfileOption, setShowProfileOption] = useState(false);

  const pricingCards = [
    {
      id: 1,
      isLogo: null,
      type: "Free",
      price: "USD $0/bulan",
      buttonTitle: "Paket Anda saat ini",
      buttonColor: "",
      features: [
        {
          id: 1,
          name: "Bantuan untuk menulis, memecahkan masalah, dan lainnya",
        },
        { id: 2, name: "Akses ke GPT-3.5" },
        { id: 3, name: "Akses terbatas ke GPT‑4o" },
        {
          id: 4,
          name: "Akses terbatas ke analisis data tingkat lanjut, pengunggahan file, visual, penelusuran web, dan GPT khusus",
        },
      ],
      termCondition: 1,
    },
    {
      id: 2,
      isLogo: "stars",
      type: "Plus",
      price: "USD $20/bulan",
      buttonTitle: "Upgrade ke Plus",
      buttonColor: "#14a47c",
      features: [
        {
          id: 1,
          name: "Akses dini ke fitur baru",
        },
        { id: 2, name: "Akses ke GPT-4, GPT‑4o, GPT-3.5" },
        { id: 3, name: "Up to 5x more messages for GPT‑4o" },
        {
          id: 4,
          name: "Akses ke analisis data tingkat lanjut, unggahan file, visi, dan penjelajahan web",
        },
        {
          id: 5,
          name: "Pembuatan gambar DALL·E",
        },
        {
          id: 6,
          name: "Buat dan gunakan GPT khusus",
        },
      ],
      termCondition: 2,
    },
    {
      id: 3,
      isLogo: "people",
      type: "Team",
      price: "USD $25 per orang/bulan*",
      buttonTitle: "Upgrade ke Team",
      buttonColor: "#0066DE",
      features: [
        {
          id: 1,
          name: "Batas yang lebih tinggi untuk GPT-4, GPT‑4o, dan alat bantu seperti pembuatan gambar DALL·E, analisis data tingkat lanjut, penelusuran web, dan lainnya",
        },
        { id: 2, name: "Buat dan berbagi GPT dengan workspace Anda" },
        { id: 3, name: "Konsol admin untuk manajemen workspace" },
        {
          id: 4,
          name: "Data Team dikecualikan dari pelatihan secara default. Pelajari selengkapnya",
        },
      ],
      termCondition: 3,
    },
  ];

  const handleOpenPricing = () => {
    setShowPricing(true);
  };

  const handleClosePricing = () => {
    setShowPricing(false);
  };

  const handleClickProfileOption = () => {
    setShowProfileOption(!showProfileOption);
  };

  const handleCloseProfileOption = () => {
    setShowProfileOption(false);
  };

  const handlePopUpOption = (event) => {
    console.log(event.clientY, "clientY");
    setOptionPosition(event.clientY);
    const { clientY } = event;
    setIsHoverLocation(clientY);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleCloseSidebarMobile();
    }

    if (
      profileOptionRef.current &&
      !profileOptionRef.current.contains(event.target) &&
      avatarButton.current &&
      !avatarButton.current.contains(event.target)
    ) {
      handleCloseProfileOption();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortedConversationContext = [...allConversationContext].reverse();

  return (
    <>
      {isOpenMobileView && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 z-[200]" />
      )}

      {/* Conversation */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 bottom-0 duration-500 ${
          isOpenMobileView ? "left-0" : "-left-[300px]"
        }  overflow-y-auto bg-[#171717] w-[293px] h-screen z-[300] flex flex-col bg-cover bg-center`}
      >
        <div className={`flex flex-col h-[100vh]`}>
          {/* Icon Top */}
          <div className="flex justify-between mx-[12px] pt-[8px] pb-[8px]">
            <div
              className="w-[40px] h-[40px] hover:bg-[#212121] p-[8px] rounded-[8px] cursor-pointer"
              onClick={toggleCloseSidebarMobile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#b4b4b4"
                  d="M3 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"
                />
              </svg>
            </div>

            <div className="w-[40px] h-[40px] hover:bg-[#212121] p-[8px] rounded-[8px] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#b4b4b4"
                viewBox="0 0 24 24"
              >
                <path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4" />
              </svg>
            </div>
          </div>
          {/* Icon Top End */}

          {/* Conversation */}
          <div
            className="flex-col ml-[12px] pr-[10px] mr-[5px] grow overflow-auto"
            id="style-scrollbar"
          >
            {/* Explore and New Chat */}
            <div className="flex items-center hover:bg-[#212121] rounded-[8px] p-[8px] cursor-pointer">
              <div>
                <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full border-[1px] border-[#4a4a4a]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <path
                      d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-[10px] text-[14px] font-roboto-regular text-white">
                ChatGPT
              </div>
            </div>
            <div className="flex items-center hover:bg-[#212121] rounded-[8px] p-[8px] cursor-pointer">
              <div>
                <div className="flex items-center justify-center w-[24px] h-[24px] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#b4b4b4"
                      d="M6.75 4.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M2.5 6.75a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0M17.25 4.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M13 6.75a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0M6.75 15a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M2.5 17.25a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0M17.25 15a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M13 17.25a4.25 4.25 0 1 1 8.5 0 4.25 4.25 0 0 1-8.5 0"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-[10px] text-[14px] font-roboto-regular text-white">
                Eksplorasi GPT
              </div>
            </div>
            {/* Explore and New Chat End */}

            {/* Loop Context Conversation */}
            <div className="mt-[20px]">
              <div className="bg-[#171717] pl-[8px] pr-[8px] pb-[8px] pt-[12px] sticky top-[-20px] z-[10]">
                <span className="text-[12px] text-[#b4b4b4] font-roboto-bold">
                  Hari ini
                </span>
              </div>
              {sortedConversationContext.map((conversation, index) => (
                <div key={conversation.id}>
                  {/*   {index === 0 && (
                    <div className="bg-[#171717] pl-[8px] pr-[8px] pb-[8px] pt-[12px] sticky top-[-20px] z-[10]">
                      <span className="text-[12px] text-[#b4b4b4] font-roboto-bold">
                        Hari ini
                      </span>
                    </div>
                  )} */}
                  <div
                    ref={conversationRef}
                    onClick={handlePopUpOption}
                    key={conversation.id}
                  >
                    <ConversationTitle title={conversation.title} />
                  </div>
                </div>
              ))}
            </div>
            {/* Loop Context Conversation End */}
          </div>
          {/* Conversation End */}

          {/* Bottom Pricing */}
          <div
            className="flex hover:bg-[#212121] rounded-[8px] mt-[8px] mx-[12px] py-[8px] px-[8px] cursor-pointer items-end"
            onClick={handleOpenPricing}
          >
            <div className="flex items-center">
              <div className="mr-[8px] w-[26px] h-[28px] rounded-full border-[1px] border-[#353535] flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M6.394 4.444c.188-.592 1.024-.592 1.212 0C8.4 8.9 9.1 9.6 13.556 10.394c.592.188.592 1.024 0 1.212C9.1 12.4 8.4 13.1 7.606 17.556c-.188.592-1.024.592-1.212 0C5.6 13.1 4.9 12.4.444 11.606c-.592-.188-.592-1.024 0-1.212C4.9 9.6 5.6 8.9 6.394 4.444m8.716 9.841a.41.41 0 0 1 .78 0c.51 2.865.96 3.315 3.825 3.826.38.12.38.658 0 .778-2.865.511-3.315.961-3.826 3.826a.408.408 0 0 1-.778 0c-.511-2.865-.961-3.315-3.826-3.826a.408.408 0 0 1 0-.778c2.865-.511 3.315-.961 3.826-3.826Zm2.457-12.968a.454.454 0 0 1 .866 0C19 4.5 19.5 5 22.683 5.567a.454.454 0 0 1 0 .866C19.5 7 19 7.5 18.433 10.683a.454.454 0 0 1-.866 0C17 7.5 16.5 7 13.317 6.433a.454.454 0 0 1 0-.866C16.5 5 17 4.5 17.567 1.317"
                  />
                </svg>
              </div>
              <div className="flex-col">
                <div>
                  <span className="text-white font-roboto-regular text-[14px]">
                    Upgrade Paket
                  </span>
                </div>
                <div>
                  <p className="text-[#9b9b9b] text-[12px] leading-[16px]">
                    Dapatkan GPT-4, DALL-E, dan...
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Pricing End */}

          {/* Avatar */}
          <div
            ref={avatarButton}
            className="flex hover:bg-[#212121] rounded-[8px] mx-[12px] mb-[8px] py-[8px] px-[8px] cursor-pointer items-end"
            onClick={handleClickProfileOption}
          >
            <div className="flex items-center">
              <div className="mr-[8px] w-[26px] h-[28px] rounded-full border-[1px] border-[#353535] flex justify-center items-center">
                <div>
                  <Image
                    src={"/pp.png"}
                    alt="Profile User"
                    width={26}
                    height={26}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex">
                <span className="text-white font-roboto-regular text-[14px]">
                  Vits Here
                </span>
              </div>
            </div>
          </div>
          {/* Avatar End */}
        </div>
      </div>
      {/* Conversation End */}

      {/* Pop up Option */}
      <div
        className={`absolute bg-[#2f2f2f] h-auto flex-col left-[170px] rounded-[16px] border-[1px] border-[#444444] z-[999] ${
          !isOptionClick ? "hidden" : ""
        } ${!isOpenMobileView ? "hidden" : ""} `}
        style={{ top: `${isHoverLocation}px` }}
        ref={popUpRef}
      >
        <div className="flex mt-[9px] mr-[9px] ml-[9px] p-[12px] hover:bg-[#424242] cursor-pointer rounded-[6px]">
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
                d="M11.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L13 6.414V15a1 1 0 1 1-2 0V6.414L8.707 8.707a1 1 0 0 1-1.414-1.414zM4 14a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-white text-[14px]">
              Bagikan
            </span>
          </div>
        </div>
        <div className="flex mr-[9px] ml-[9px] p-[12px] hover:bg-[#424242] cursor-pointer rounded-[6px]">
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
                d="M13.293 4.293a4.536 4.536 0 1 1 6.414 6.414l-1 1-7.094 7.094A5 5 0 0 1 8.9 20.197l-4.736.79a1 1 0 0 1-1.15-1.151l.789-4.736a5 5 0 0 1 1.396-2.713zM13 7.414l-6.386 6.387a3 3 0 0 0-.838 1.628l-.56 3.355 3.355-.56a3 3 0 0 0 1.628-.837L16.586 11zm5 2.172L14.414 6l.293-.293a2.536 2.536 0 0 1 3.586 3.586z"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-white text-[14px]">
              Ganti nama
            </span>
          </div>
        </div>
        <div className="flex mr-[9px] ml-[9px] p-[12px] hover:bg-[#424242] cursor-pointer rounded-[6px]">
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
                d="M4.83 4.106A2 2 0 0 1 6.617 3h10.764a2 2 0 0 1 1.789 1.106l1.618 3.236a2 2 0 0 1 .211.894V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.236a2 2 0 0 1 .211-.894zM17.381 5H6.618l-1 2h12.764zM19 9H5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM9 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-white text-[14px]">
              Arsipkan
            </span>
          </div>
        </div>
        <div className="flex mb-[9px] mr-[9px] ml-[9px] p-[12px] hover:bg-[#424242] cursor-pointer rounded-[6px]">
          <div className="mr-[13px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#f93a37"
                d="M10.556 4a1 1 0 0 0-.97.751l-.292 1.14h5.421l-.293-1.14A1 1 0 0 0 13.453 4zm6.224 1.892-.421-1.639A3 3 0 0 0 13.453 2h-2.897A3 3 0 0 0 7.65 4.253l-.421 1.639H4a1 1 0 1 0 0 2h.1l1.215 11.425A3 3 0 0 0 8.3 22H15.7a3 3 0 0 0 2.984-2.683l1.214-11.425H20a1 1 0 1 0 0-2zm1.108 2H6.112l1.192 11.214A1 1 0 0 0 8.3 20H15.7a1 1 0 0 0 .995-.894zM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1"
              ></path>
            </svg>
          </div>
          <div>
            <span className="font-roboto-regular text-[#f93a37] text-[14px]">
              Hapus
            </span>
          </div>
        </div>
      </div>
      {/* Pop up Option End */}

      {/* Profile Option */}
      {showProfileOption && (
        <div
          ref={profileOptionRef}
          className="absolute left-[12px] bottom-[56px] bg-[#2f2f2f] w-[269px] h-auto flex-col rounded-[8px] border-[1px] border-[#444444] z-[999]"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
          }}
        >
          {/* 1. ===== */}
          <div className="flex mt-[9px] ml-[7px] mr-[7px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
            <div className="p-[8px] flex">
              <div className="text-[#e3e3e3] text-[14px] font-roboto-regular">
                rdrproganti@gmail.com
              </div>
            </div>
          </div>
          {/* 1. ===== */}

          <div className="flex w-[255px] ml-[7px] h-[1px] bg-[#444444] my-[6px]"></div>

          {/* 2. ===== */}
          <div className="flex justify-between ml-[7px] mr-[7px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
            <div className="p-[8px] flex">
              <div className="flex items-center">
                <div className="flex pr-[12px]">
                  <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        fill-rule="evenodd"
                        d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7M10.968 14.002a1 1 0 0 1-.719 1.218C7.467 15.937 5.5 18.29 5.5 21a1 1 0 1 1-2 0c0-3.729 2.69-6.8 6.25-7.717a1 1 0 0 1 1.218.72"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        fill="#ffffff"
                        d="M17.25 15.625a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M21.75 15.625a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M21.75 20.125a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M17.25 20.125a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="text-white text-[14px] font-roboto-regular">
                  GPT Saya
                </div>
              </div>
            </div>
          </div>
          {/* 2. ===== */}

          {/* 3. ===== */}
          <div className="flex justify-between ml-[7px] mr-[7px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
            <div className="p-[8px] flex">
              <div className="flex items-center">
                <div className="flex pr-[12px]">
                  <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M10.663 6.387c.152-.096.337.023.337.203V8a1 1 0 1 0 2 0V6.59c0-.18.185-.3.337-.203a2.5 2.5 0 0 1-.357 4.413 1 1 0 0 1 .02.2v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 .02-.2 2.5 2.5 0 0 1-.357-4.413"
                      ></path>
                      <path
                        fill="#FFFFFF"
                        d="M17.975 4.01A8 8 0 0 0 17.4 4H9.8c-.857 0-1.439 0-1.889.038-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C6 6.361 6 6.943 6 7.8v8.37c.313-.11.65-.17 1-.17h11V4.6c0-.297 0-.459-.01-.575l-.001-.014zM17.657 18H7a1 1 0 1 0 0 2h10.657a5.5 5.5 0 0 1 0-2M4 19V7.759c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C8.29 2 8.954 2 9.758 2h7.674c.252 0 .498 0 .706.017.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77.017.208.017.454.017.706V17a1 1 0 0 1-.078.386c-.476 1.14-.476 2.089 0 3.228A1 1 0 0 1 19 22H7a3 3 0 0 1-3-3"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="text-white text-[14px] font-roboto-regular">
                  Sesuaikan ChatGPT
                </div>
              </div>
            </div>
          </div>
          {/* 3. ===== */}

          {/* 4. ===== */}
          <div className="flex justify-between ml-[7px] mr-[7px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
            <div className="p-[8px] flex">
              <div className="flex items-center">
                <div className="flex pr-[12px]">
                  <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        fill-rule="evenodd"
                        d="M15 5a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V6.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L17.586 5zM4 7a3 3 0 0 1 3-3h3a1 1 0 1 1 0 2H7a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 1 1 2 0v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="text-white text-[14px] font-roboto-regular">
                  Bantuan & Pertanyaan Umum
                </div>
              </div>
            </div>
          </div>
          {/* 4. ===== */}

          {/* 5. ===== */}
          <div className="flex justify-between ml-[7px] mr-[7px] mb-[4px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
            <div className="p-[8px] flex">
              <div className="flex items-center">
                <div className="flex pr-[12px]">
                  <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        d="M11.568 3.5a1 1 0 0 0-.863.494l-.811 1.381A3 3 0 0 1 7.33 6.856l-1.596.013a1 1 0 0 0-.858.501l-.44.761a1 1 0 0 0-.003.992l.792 1.4a3 3 0 0 1 0 2.954l-.792 1.4a1 1 0 0 0 .004.992l.439.76a1 1 0 0 0 .858.502l1.596.013a3 3 0 0 1 2.564 1.48l.811 1.382a1 1 0 0 0 .863.494h.87a1 1 0 0 0 .862-.494l.812-1.381a3 3 0 0 1 2.563-1.481l1.596-.013a1 1 0 0 0 .859-.501l.439-.761a1 1 0 0 0 .004-.992l-.793-1.4a3 3 0 0 1 0-2.953l.793-1.401a1 1 0 0 0-.004-.992l-.439-.76a1 1 0 0 0-.859-.502l-1.596-.013a3 3 0 0 1-2.563-1.48L13.3 3.993a1 1 0 0 0-.862-.494zM8.98 2.981A3 3 0 0 1 11.568 1.5h.87a3 3 0 0 1 2.588 1.481l.81 1.382a1 1 0 0 0 .855.494l1.597.013a3 3 0 0 1 2.575 1.502l.44.76a3 3 0 0 1 .011 2.975l-.792 1.4a1 1 0 0 0 0 .985l.792 1.401a3 3 0 0 1-.012 2.974l-.439.761a3 3 0 0 1-2.575 1.503l-1.597.012a1 1 0 0 0-.854.494l-.811 1.382a3 3 0 0 1-2.588 1.481h-.87a3 3 0 0 1-2.588-1.481l-.811-1.382a1 1 0 0 0-.855-.494l-1.596-.012a3 3 0 0 1-2.576-1.503l-.439-.76a3 3 0 0 1-.012-2.975l.793-1.4a1 1 0 0 0 0-.985l-.793-1.4a3 3 0 0 1 .012-2.975l.44-.761A3 3 0 0 1 5.717 4.87l1.596-.013a1 1 0 0 0 .855-.494z"
                      ></path>
                      <path
                        fill="#ffffff"
                        d="M12.003 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M8.502 12a3.5 3.5 0 1 1 7 .001 3.5 3.5 0 0 1-7-.001"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="text-white text-[14px] font-roboto-regular">
                  Pengaturan
                </div>
              </div>
            </div>
          </div>
          {/* 5. ===== */}

          <div className="flex w-[255px] ml-[7px] h-[1px] bg-[#444444] my-[6px]"></div>

          {/* 6. ===== */}
          <div className="flex justify-between ml-[7px] mr-[7px] mb-[4px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
            <div className="p-[8px] flex">
              <div className="flex items-center">
                <div className="flex pr-[12px]">
                  <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="text-white text-[14px] font-roboto-regular">
                  Keluar
                </div>
              </div>
            </div>
          </div>
          {/* 6. ===== */}
        </div>
      )}

      {/* Profile Option End */}

      {/* Show Pricing */}
      {showPricing && (
        <div className="absolute inset-0 flex items-center justify-center z-[999]">
          <div className="bg-[#2f2f2f] rounded shadow-lg w-full h-full overflow-y-auto flex flex-col">
            <div className="pt-[26px] pb-[27px] px-[32px] flex items-center justify-center relative">
              <div>
                <span className="text-white font-semibold text-[20px] leading-[28px]">
                  Upgrade Paket Anda
                </span>
              </div>
              <div
                className="cursor-pointer absolute right-[12px]"
                onClick={handleClosePricing}
              >
                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#676767]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#e3e3e3"
                      fill-rule="evenodd"
                      d="M5.636 5.636a1 1 0 0 1 1.414 0l4.95 4.95 4.95-4.95a1 1 0 0 1 1.414 1.414L13.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 0 1-1.414-1.414l4.95-4.95-4.95-4.95a1 1 0 0 1 0-1.414"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[16px]">
              {pricingCards.map((pricingCard) => (
                <div key={pricingCard.id} className="flex justify-center">
                  <PricingCardMobile
                    id={pricingCard.id}
                    isLogo={pricingCard.isLogo}
                    type={pricingCard.type}
                    price={pricingCard.price}
                    buttonTitle={pricingCard.buttonTitle}
                    buttonColor={pricingCard.buttonColor}
                    features={pricingCard.features}
                    termCondition={pricingCard.termCondition}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center">
              <div className="text-[14px] py-[25px] font-roboto-regular text-[#f9f9f9]">
                Perlu kemampuan lebih?{" "}
                <a href="#" className="underline">
                  Lihat ChatGPT Enterprise
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Show Pricing End */}
    </>
  );
}
