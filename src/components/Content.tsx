"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSidebar } from "@/contexts/SidebarContext";
import { useConversation } from "@/contexts/ConversationContext";
import axios from "axios";
import Answer from "./Answer";
import NoConversationDisplay from "./NoConversationDisplay";
import Question from "./Question";
import AnswerLoading from "./AnswerLoading";
import {supabase} from '../utils/supabaseClient';
import { random } from "nanoid";

export default function Content() {
  const {
    toggleSidebar,
    isContentHidden,
    toggleOpenSidebarMobile,
    isOpenMobileView,
  } = useSidebar();
  const {
    allConversationContext,
    addConversation,
    thisConversationContext,
    setThisConversation,
  } = useConversation();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [textareaHeight, setTextareaHeight] = useState(52);
  const [isOpenGPTOption, setIsOpenGPTOption] = useState(false);
  const [isOpenUserOption, setIsOpenUserOption] = useState(false);
  const [isTempChat, setIsTempChat] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const gptOptionRef = useRef(null);
  const userOptionRef = useRef(null);
  const buttonRefGPTOption = useRef(null);
  const buttonRefUserOption = useRef(null);
  
  const openGPTOptionHandler = () => {
    setIsOpenGPTOption(!isOpenGPTOption);
  };

  const openUserOptionHandler = () => {
    setIsOpenUserOption(!isOpenUserOption);
  };

  const handleClickOutside = (event) => {
    if (
      gptOptionRef.current &&
      !gptOptionRef.current.contains(event.target) &&
      buttonRefGPTOption.current &&
      !buttonRefGPTOption.current.contains(event.target)
    ) {
      setIsOpenGPTOption(false);
    }
    if (
      userOptionRef.current &&
      !userOptionRef.current.contains(event.target) &&
      buttonRefUserOption.current &&
      !buttonRefUserOption.current.contains(event.target)
    ) {
      setIsOpenUserOption(false);
    }
  };

  useEffect(() => {
    if (isOpenGPTOption || isOpenUserOption) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenGPTOption, isOpenUserOption]);

  const handleChange = (event) => {
    setText(event.target.value);
    adjustHeight(event.target);
  };

  const handleBlur = (event) => {
    if (text.trim() === "") {
      setTextareaHeight(52);
      event.target.style.height = "52px";
      event.target.style.overflow = "hidden";
    }
  };

  const adjustHeight = (element) => {
    if (element.scrollHeight >= 74) {
      console.log(element.style.height, "height");
      element.style.height = "auto";
      const newHeight = element.scrollHeight;
      console.log(newHeight, "scrollHeight");

      if (newHeight > 200) {
        element.style.overflow = "auto";
        element.style.height = `200px`;
        setTextareaHeight(200);
      } else {
        element.style.overflow = "hidden";
        element.style.height = `${newHeight}px`;
        setTextareaHeight(newHeight);
      }
    }
  };

  const handleSave = async (newContent) => {
    console.log("Content Saved:", newContent);
    setText(newContent);
    try {
      const response = await axios.post("/api/geminiai", { question: text });
      console.log(response);
      
      // const res = await fetch("https://api.openai.com/v1/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer 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`,
      //   },
      //   body: JSON.stringify({
      //     model: "gpt-4.0",
      //     messages: [{ role: "user", content: text }],
      //     max_tokens: 100,
      //   }),
      // });

      // const data = await res.json();
      // setResponse(data.choices[0].message.content);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          content: response.data.content,
          type: "answer",
        },
      ]);
      setIsLoadingAnswer(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const tempChatClick = () => {
    setIsTempChat(!isTempChat);
  };

  const handleTruncateAddConversation = (text: string) => {
    const truncatedText = text.split(" ").slice(0, 10).join(" ");
    return truncatedText;
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    setText("");
    console.log(text);
    // const { data, error} = await supabase
    //   .from('users')
    //   .insert([{ id: random(10), text }])
    
    // if(error) {
    //   console.log(error);
    // }

    // if(data) {
    //   console.log(data);
    // }

    setIsLoadingAnswer(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        content: text,
        type: "question",
      },
    ]);

    if (thisConversationContext == null) {
      const truncateContext = handleTruncateAddConversation(text);

      addConversation({ id: 10, title: truncateContext, date: "2024-07-04" });
    }

    setThisConversation(10);

    try {
      const response = await axios.post("/api/geminiai", { question: text });
      console.log(response);
      
      // const res = await fetch("https://api.openai.com/v1/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer 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`,
      //   },
      //   body: JSON.stringify({
      //     model: "gpt-4.0",
      //     messages: [{ role: "user", content: text }],
      //     max_tokens: 100,
      //   }),
      // });

      // const data = await res.json();
      // setResponse(data.choices[0].message.content);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          content: response.data.content,
          type: "answer",
        },
      ]);
      setIsLoadingAnswer(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openSidebarMobile = async () => {
    toggleOpenSidebarMobile();
  };

  const firstDivHeight =
    textareaHeight >= 52 ? `calc(100% - ${textareaHeight}px)` : "91%";

  return (
    <div className="bg-[#212121] w-full h-screen transition duration-300 flex flex-col z-[30]">
      {/* Navbar */}
      <div className="sticky top-0 bg-[#212121] w-full h-[56px] flex justify-between">
        {/* Mobile View Hamburger */}
        <div
          className="flex items-center md:hidden cursor-pointer"
          onClick={openSidebarMobile}
        >
          <div className="w-[24px] h-[24px] my-[18px] mx-[22px]">
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
        </div>
        {/* Mobile View Hamburger End */}

        <div className="flex items-center">
          <div
            className={`w-[40px] h-[40px] hover:bg-[#2f2f2f] p-[8px] rounded-[8px] cursor-pointer ml-[12px] mt-[5px] ${
              !isContentHidden ? "hidden" : ""
            } z-[90]`}
            onClick={toggleSidebar}
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
                d="M8.857 3h6.286c1.084 0 1.958 0 2.666.058.729.06 1.369.185 1.961.487a5 5 0 0 1 2.185 2.185c.302.592.428 1.233.487 1.961.058.708.058 1.582.058 2.666v3.286c0 1.084 0 1.958-.058 2.666-.06.729-.185 1.369-.487 1.961a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C17.1 21 16.227 21 15.143 21H8.857c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.232-.487-1.961C1.5 15.6 1.5 14.727 1.5 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.728.185-1.369.487-1.96A5 5 0 0 1 4.23 3.544c.592-.302 1.233-.428 1.961-.487C6.9 3 7.773 3 8.857 3M6.354 5.051c-.605.05-.953.142-1.216.276a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216-.05.617-.051 1.41-.051 2.546v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h.6V5h-.6c-1.137 0-1.929 0-2.546.051M11.5 5v14h3.6c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.134-.263.226-.611.276-1.216.05-.617.051-1.41.051-2.546v-3.2c0-1.137 0-1.929-.051-2.546-.05-.605-.142-.953-.276-1.216a3 3 0 0 0-1.311-1.311c-.263-.134-.611-.226-1.216-.276C17.029 5.001 16.236 5 15.1 5zM5 8.5a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1M5 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"
              />
            </svg>
          </div>

          <div className="relative">
            {isOpenGPTOption && (
              <div
                ref={gptOptionRef}
                className="absolute left-[12px] top-[56px] bg-[#2f2f2f] w-[340px] h-auto flex-col rounded-[16px] border-[1px] border-[#444444]"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
                }}
              >
                {/* 1. ===== */}
                <div className="flex mt-[9px] ml-[9px] mr-[9px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                  <div className="p-[12px] flex">
                    <div className="flex pr-[12px]">
                      <div className="w-[28px] h-[28px] bg-[#424242] rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M19.898.855a.4.4 0 0 0-.795 0c-.123 1.064-.44 1.802-.943 2.305-.503.503-1.241.82-2.306.943a.4.4 0 0 0 .001.794c1.047.119 1.801.436 2.317.942.512.504.836 1.241.93 2.296a.4.4 0 0 0 .796 0c.09-1.038.413-1.792.93-2.308.515-.516 1.269-.839 2.306-.928a.4.4 0 0 0 .001-.797c-1.055-.094-1.792-.418-2.296-.93-.506-.516-.823-1.27-.941-2.317Z"
                          />
                          <path
                            fill="#ffffff"
                            d="M12.001 1.5a1 1 0 0 1 .993.887c.313 2.77 1.153 4.775 2.5 6.146 1.34 1.366 3.3 2.223 6.095 2.47a1 1 0 0 1-.003 1.993c-2.747.238-4.75 1.094-6.123 2.467-1.373 1.374-2.229 3.376-2.467 6.123a1 1 0 0 1-1.992.003c-.248-2.795-1.105-4.754-2.47-6.095-1.372-1.347-3.376-2.187-6.147-2.5a1 1 0 0 1-.002-1.987c2.818-.325 4.779-1.165 6.118-2.504 1.339-1.34 2.179-3.3 2.504-6.118A1 1 0 0 1 12 1.5ZM6.725 11.998c1.234.503 2.309 1.184 3.21 2.069.877.861 1.56 1.888 2.063 3.076.5-1.187 1.18-2.223 2.051-3.094.871-.87 1.907-1.55 3.094-2.05-1.188-.503-2.215-1.187-3.076-2.064-.885-.901-1.566-1.976-2.069-3.21-.505 1.235-1.19 2.3-2.081 3.192-.891.89-1.957 1.576-3.192 2.082Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-col">
                      <div className="text-white text-[14px] font-roboto-regular">
                        ChatGPT Plus
                      </div>

                      <div>
                        <p className="text-[#b4b4b4] text-[12px] font-roboto-regular leading-[16px]">
                          Our Smart Model & Others
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="">
                        <span className="rounded-full border-[1px] border-[#4e4e4e] bg-[#2f2f2f] hover:bg-[#424242] text-[14px] text-white font-roboto-bold py-[5px] px-[13px]">
                          Upgrade
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 1. ===== */}

                {/* 2. ===== */}
                <div className="flex justify-between ml-[9px] mr-[9px] mb-[4px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                  <div className="p-[12px] flex">
                    <div className="flex">
                      <div className="flex pr-[12px]">
                        <div className="w-[28px] h-[28px] bg-[#424242] rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#ffffff"
                              d="M12 7.42a22 22 0 0 0-2.453 2.127A22 22 0 0 0 7.42 12a22 22 0 0 0 2.127 2.453c.807.808 1.636 1.52 2.453 2.128a22 22 0 0 0 2.453-2.128A22 22 0 0 0 16.58 12a22 22 0 0 0-2.127-2.453A22 22 0 0 0 12 7.42m1.751-1.154a25 25 0 0 1 2.104 1.88 25 25 0 0 1 1.88 2.103c.316-.55.576-1.085.779-1.59.35-.878.507-1.625.503-2.206-.003-.574-.16-.913-.358-1.111-.199-.199-.537-.356-1.112-.36-.58-.003-1.328.153-2.205.504-.506.203-1.04.464-1.59.78Zm3.983 7.485a25 25 0 0 1-1.88 2.104 25 25 0 0 1-2.103 1.88 13 13 0 0 0 1.59.779c.878.35 1.625.507 2.206.503.574-.003.913-.16 1.111-.358.199-.199.356-.538.36-1.112.003-.58-.154-1.328-.504-2.205a13 13 0 0 0-.78-1.59ZM12 18.99c.89.57 1.768 1.03 2.605 1.364 1.026.41 2.036.652 2.955.646.925-.006 1.828-.267 2.5-.94.673-.672.934-1.575.94-2.5.006-.919-.236-1.929-.646-2.954A15.7 15.7 0 0 0 18.99 12a15.6 15.6 0 0 0 1.364-2.606c.41-1.025.652-2.035.646-2.954-.006-.925-.267-1.828-.94-2.5-.672-.673-1.575-.934-2.5-.94-.919-.006-1.929.235-2.954.646-.838.335-1.716.795-2.606 1.364a15.7 15.7 0 0 0-2.606-1.364C8.37 3.236 7.36 2.994 6.44 3c-.925.006-1.828.267-2.5.94-.673.672-.934 1.575-.94 2.5-.006.919.235 1.929.646 2.955A15.7 15.7 0 0 0 5.01 12c-.57.89-1.03 1.768-1.364 2.605-.41 1.026-.652 2.036-.646 2.955.006.925.267 1.828.94 2.5.672.673 1.575.934 2.5.94.92.006 1.93-.235 2.955-.646A15.7 15.7 0 0 0 12 18.99m-1.751-1.255a25 25 0 0 1-2.104-1.88 25 25 0 0 1-1.88-2.104c-.315.55-.576 1.085-.779 1.59-.35.878-.507 1.625-.503 2.206.003.574.16.913.359 1.111.198.199.537.356 1.111.36.58.003 1.328-.153 2.205-.504.506-.203 1.04-.463 1.59-.78Zm-3.983-7.486a25 25 0 0 1 1.88-2.104 25 25 0 0 1 2.103-1.88 13 13 0 0 0-1.59-.779c-.878-.35-1.625-.507-2.206-.503-.574.003-.913.16-1.111.359-.199.198-.356.537-.36 1.111-.003.58.153 1.328.504 2.205.203.506.464 1.04.78 1.59Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-col">
                        <div className="text-white text-[14px] font-roboto-regular">
                          ChatGPT
                        </div>

                        <div>
                          <p className="text-[#b4b4b4] text-[12px] font-roboto-regular leading-[16px]">
                            Suitable for daily tasks
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-[12px] flex items-center">
                    <div className="flex items-center ">
                      <div className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m14.076-4.068a1 1 0 0 1 .242 1.393l-4.75 6.75a1 1 0 0 1-1.558.098l-2.5-2.75a1 1 0 0 1 1.48-1.346l1.66 1.827 4.032-5.73a1 1 0 0 1 1.394-.242"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 2. ===== */}

                <div className="flex mx-[21px] w-[298px] h-[1px] bg-[#444444]"></div>
                {/* 3. ===== */}
                <div className="flex justify-between mt-[4px] ml-[9px] mr-[9px] mb-[9px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                  <div className="p-[9px] flex">
                    <div className="flex items-center ml-[3px]">
                      <div className="flex pr-[12px]">
                        <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#ffffff"
                              fill-rule="evenodd"
                              d="M10.974 3.252a1 1 0 0 1-.746 1.201 7.74 7.74 0 0 0-3.876 2.24 1 1 0 1 1-1.458-1.37 9.74 9.74 0 0 1 4.878-2.817 1 1 0 0 1 1.202.746m2.052 0a1 1 0 0 1 1.202-.746 9.74 9.74 0 0 1 4.878 2.818 1 1 0 1 1-1.458 1.37 7.74 7.74 0 0 0-3.876-2.24 1 1 0 0 1-.746-1.202M3.91 8.514a1 1 0 0 1 .67 1.246A7.8 7.8 0 0 0 4.25 12c0 .774.113 1.53.325 2.25a1 1 0 0 1-1.92.564A10 10 0 0 1 2.25 12c0-.978.144-1.924.413-2.817a1 1 0 0 1 1.246-.669m16.182 0a1 1 0 0 1 1.246.67c.269.892.413 1.838.413 2.816a10 10 0 0 1-.406 2.813 1 1 0 0 1-1.919-.564A8 8 0 0 0 19.75 12a7.8 7.8 0 0 0-.328-2.24 1 1 0 0 1 .669-1.246m-.982 8.768a1 1 0 0 1 .086 1.412c-1.293 1.462-3.006 2.551-4.955 3.033a1 1 0 1 1-.48-1.941c1.53-.379 2.895-1.24 3.938-2.418a1 1 0 0 1 1.411-.086m-12.937-.008a1 1 0 0 1 .293 1.384L5.593 20H10a1 1 0 1 1 0 2H3.75a1 1 0 0 1-.838-1.545l1.876-2.887a1 1 0 0 1 1.384-.294"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-white text-[14px] font-roboto-regular">
                          Temporary chat
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-[12px] flex items-center"
                    onClick={tempChatClick}
                  >
                    <div className="flex items-center ">
                      <div
                        className={`w-[32px] h-[20px] rounded-full border-[1px] border-[#4b4b4b] relative flex items-center ${
                          isTempChat ? "bg-[#10A37F]" : "bg-transparent"
                        } transition duration-200`}
                      >
                        <div
                          className={`absolute w-[16px] left-0 h-[16px] bg-[white] rounded-full p-[2px] ${
                            isTempChat
                              ? "translate-x-[14px]"
                              : "translate-x-[0px]"
                          } transition duration-200`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 3. ===== */}
              </div>
            )}

            <div
              className="flex items-center justify-center ml-[12px] mt-[8px] w-[116px] h-[40px] rounded-[8px] hover:bg-[#2f2f2f] cursor-pointer"
              ref={buttonRefGPTOption}
              onClick={openGPTOptionHandler}
            >
              <div className="ml-[12px]">
                <span className="text-[#b4b4b4] text-[18px] font-semibold">
                  ChatGPT
                </span>
              </div>
              <div className="ml-[4px] mr-[12px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#9b9b9b"
                    d="M5.293 9.293a1 1 0 0 1 1.414 0L12 14.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex relative">
          {/* Mobile View */}
          <div className="w-[24px] h-[24px] md:hidden flex items-center my-[18px] mx-[22px] cursor-pointer">
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
          {/* Mobile View End */}

          {/* <div
            className="w-[40px] h-[40px] mt-[8px] mr-[16px] mb-[11px] flex items-center justify-center rounded-full hover:bg-[#2f2f2f] cursor-pointer hidden md:block"
            onClick={openUserOptionHandler}
            ref={buttonRefUserOption}
          >
            <Image
              width={35}
              height={35}
              src="/pp.png"
              alt="User"
              className="rounded-full m-[4px]"
            />
          </div> */}
          {isOpenUserOption && (
            <div
              ref={userOptionRef}
              className="absolute right-[5px] top-[56px] bg-[#2f2f2f] w-[280px] h-auto flex-col rounded-[16px] border-[1px] border-[#444444]"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
              }}
            >
              {/* 1. ===== */}
              <div className="flex mt-[9px] ml-[9px] mr-[9px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                <div className="p-[12px] flex">
                  <div className="flex pr-[12px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M12 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 7a5 5 0 1 1 10 0A5 5 0 0 1 7 7M10.968 14.002a1 1 0 0 1-.719 1.218C7.467 15.937 5.5 18.29 5.5 21a1 1 0 1 1-2 0c0-3.729 2.69-6.8 6.25-7.717a1 1 0 0 1 1.218.72"
                        ></path>
                        <path
                          fill="#ffffff"
                          d="M17.25 15.625a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M21.75 15.625a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M21.75 20.125a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0M17.25 20.125a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="text-white text-[14px] font-roboto-regular">
                      GPT I
                    </div>
                  </div>
                </div>
              </div>
              {/* 1. ===== */}

              {/* 2. ===== */}
              <div className="flex ml-[9px] mr-[9px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                <div className="p-[12px] flex">
                  <div className="flex pr-[12px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M10.663 6.387c.152-.096.337.023.337.203V8a1 1 0 1 0 2 0V6.59c0-.18.185-.3.337-.203a2.5 2.5 0 0 1-.357 4.413 1 1 0 0 1 .02.2v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 .02-.2 2.5 2.5 0 0 1-.357-4.413"
                        ></path>
                        <path
                          fill="#ffffff"
                          d="M17.975 4.01A8 8 0 0 0 17.4 4H9.8c-.857 0-1.439 0-1.889.038-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C6 6.361 6 6.943 6 7.8v8.37c.313-.11.65-.17 1-.17h11V4.6c0-.297 0-.459-.01-.575l-.001-.014zM17.657 18H7a1 1 0 1 0 0 2h10.657a5.5 5.5 0 0 1 0-2M4 19V7.759c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C8.29 2 8.954 2 9.758 2h7.674c.252 0 .498 0 .706.017.229.019.499.063.77.201a2 2 0 0 1 .874.874c.138.271.182.541.201.77.017.208.017.454.017.706V17a1 1 0 0 1-.078.386c-.476 1.14-.476 2.089 0 3.228A1 1 0 0 1 19 22H7a3 3 0 0 1-3-3"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="text-white text-[14px] font-roboto-regular">
                      Adjust ChatGPT
                    </div>
                  </div>
                </div>
              </div>
              {/* 2. ===== */}

              {/* 3. ===== */}
              <div className="flex ml-[9px] mr-[9px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                <div className="p-[12px] flex">
                  <div className="flex pr-[12px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
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
                          d="M11.568 3.5a1 1 0 0 0-.863.494l-.811 1.381A3 3 0 0 1 7.33 6.856l-1.596.013a1 1 0 0 0-.858.501l-.44.761a1 1 0 0 0-.003.992l.792 1.4a3 3 0 0 1 0 2.954l-.792 1.4a1 1 0 0 0 .004.992l.439.76a1 1 0 0 0 .858.502l1.596.013a3 3 0 0 1 2.564 1.48l.811 1.382a1 1 0 0 0 .863.494h.87a1 1 0 0 0 .862-.494l.812-1.381a3 3 0 0 1 2.563-1.481l1.596-.013a1 1 0 0 0 .859-.501l.439-.761a1 1 0 0 0 .004-.992l-.793-1.4a3 3 0 0 1 0-2.953l.793-1.401a1 1 0 0 0-.004-.992l-.439-.76a1 1 0 0 0-.859-.502l-1.596-.013a3 3 0 0 1-2.563-1.48L13.3 3.993a1 1 0 0 0-.862-.494zM8.98 2.981A3 3 0 0 1 11.568 1.5h.87a3 3 0 0 1 2.588 1.481l.81 1.382a1 1 0 0 0 .855.494l1.597.013a3 3 0 0 1 2.575 1.502l.44.76a3 3 0 0 1 .011 2.975l-.792 1.4a1 1 0 0 0 0 .985l.792 1.401a3 3 0 0 1-.012 2.974l-.439.761a3 3 0 0 1-2.575 1.503l-1.597.012a1 1 0 0 0-.854.494l-.811 1.382a3 3 0 0 1-2.588 1.481h-.87a3 3 0 0 1-2.588-1.481l-.811-1.382a1 1 0 0 0-.855-.494l-1.596-.012a3 3 0 0 1-2.576-1.503l-.439-.76a3 3 0 0 1-.012-2.975l.793-1.4a1 1 0 0 0 0-.985l-.793-1.4a3 3 0 0 1 .012-2.975l.44-.761A3 3 0 0 1 5.717 4.87l1.596-.013a1 1 0 0 0 .855-.494z"
                        ></path>
                        <path
                          fill="#ffffff"
                          d="M12.003 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M8.502 12a3.5 3.5 0 1 1 7 .001 3.5 3.5 0 0 1-7-.001"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-col">
                    <div className="text-white text-[14px] font-roboto-regular">
                      arrangement
                    </div>
                  </div>
                </div>
              </div>
              {/* 3. ===== */}

              <div className="flex mx-[21px] my-[4px] w-[238px] h-[1px] bg-[#444444]"></div>

              {/* 4. ===== */}
              <div className="flex ml-[9px] mb-[9px] mr-[9px] hover:bg-[#424242] rounded-[6px] cursor-pointer">
                <div className="p-[12px] flex">
                  <div className="flex pr-[12px]">
                    <div className="w-[20px] h-[20px] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                  <div className="flex-col">
                    <div className="text-white text-[14px] font-roboto-regular">
                      Exit
                    </div>
                  </div>
                </div>
              </div>
              {/* 4. ===== */}
            </div>
          )}
        </div>
      </div>
      {/* Navbar End */}

      <div
        className={`overflow-auto  ${
          messages.length <= 0 ? "flex items-center justify-center" : ""
        }`}
        style={{ height: firstDivHeight }}
        id="style-scrollbar"
      >
        {/* Messages */}
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id}>
              {message.type === "answer" ? (
                <Answer content={message.content} />
              ) : message.type === "question" ? (
                <Question content={message.content} onSave= {handleSave}/>
              ) : null}
            </div>
          ))
        ) : (
          <NoConversationDisplay />
        )}
        {isLoadingAnswer && <AnswerLoading />}

        {/* Messages End */}
      </div>

      {/* Question Input */}
      <div className="flex flex-col">
        <div className="bg-[#212121] flex justify-center">
          <form
            onSubmit={handleSubmitQuestion}
            className="w-full max-w-[768px] mx-[12px]"
          >
            <div
              className="flex items-end relative bg-[#2f2f2f] rounded-[26px] h-[52px]"
              style={{ height: textareaHeight }}
            >
              <div className="absolute left-[16px] mb-[14px] cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                  />
                </svg>
              </div>
              <textarea
                id="chatTextarea"
                placeholder="Send a message to chatgpt"
                className="bg-transparent ml-[52px] mr-[50px] rounded-[26px] resize-none p-[13.5px] w-full h-[52px] text-[#ececec] font-roboto-regular focus:outline-none focus:border-transparent"
                value={text}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitQuestion(e);
                  }
                }}
              />
              <div className="absolute right-[10px] mb-[10px] cursor-pointer">
                <button
                  type="submit"
                  className="bg-white w-[32px] h-[32px] rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#000000"
                      d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center h-[35px]">
          <span className="text-[#b4b4b4] font-roboto-regular text-[12px]">
            {/* ChatGPT dapat membuat kesalahan. Periksa info penting. */}
          </span>
        </div>
      </div>
      {/* Question Input End */}
    </div>
  );
}
