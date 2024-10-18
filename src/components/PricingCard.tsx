import React, { useState } from "react";

export default function PricingCard({
  id,
  isLogo,
  type,
  price,
  buttonTitle,
  buttonColor,
  features,
  termCondition,
}) {
  const [isHoveredButton, setIsHoveredButton] = useState(false);

  const getButtonStyle = () => {
    let backgroundColor = buttonColor;

    if (id === 2 && isHoveredButton) {
      return { backgroundColor: "#1a7f64" };
    } else if (id === 3 && isHoveredButton) {
      return { backgroundColor: "#1d4ed8" };
    }

    return { backgroundColor };
  };
  return (
    <div
      className={`flex flex-col justify-between pl-[24px] pr-[25px] py-[16px] max-w-[341px] ${
        id == 3 ? "" : "border-r-[1px] border-r-[#3e3e3e] "
      } h-[462px]`}
    >
      <div>
        <div>
          <span className="text-white font-semibold text-[20px] leading-[28px]">
            {type}
          </span>
        </div>
        <div>
          <span className="text-[#b4b4b4] text-[16px] leading-[24px]">
            {price}
          </span>
        </div>
        <button
          className={`border-[1px] border-[#3e3e3e] rounded-full py-[13px] flex justify-center items-center w-[292px] my-[20px] ${
            id === 1 ? "cursor-not-allowed" : ""
          }`}
          style={getButtonStyle()}
          onMouseEnter={() => setIsHoveredButton(true)}
          onMouseLeave={() => setIsHoveredButton(false)}
        >
          <span
            className={`${
              id == 1 ? "text-[#8a8a8a]" : "text-white"
            } text-[14px] font-roboto-bold`}
          >
            {buttonTitle}
          </span>
        </button>
        {features.map((feature) => (
          <div className="flex" key={feature.id}>
            <div className="w-[16px] h-[16px] mt-[3px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#f9f9f9"
                  d="M18.063 5.674a1 1 0 0 1 .263 1.39l-7.5 11a1 1 0 0 1-1.533.143l-4.5-4.5a1 1 0 1 1 1.414-1.414l3.647 3.647 6.82-10.003a1 1 0 0 1 1.39-.263"
                ></path>
              </svg>
            </div>
            <div className="ml-[8px]">
              <span className="text-[14px] leading-[20px] text-[#f9f9f9]">
                {feature.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        {id === 1 && (
          <div className="text-[12px] leading-[16px] text-[#e3e3e3]">
            Already have a package?Look
            <a href="#" className="underline font-roboto-bold">
              {" "}
              billing assistance
            </a>
          </div>
        )}
        {id === 2 && (
          <div className="text-[12px] leading-[16px] text-[#e3e3e3]">
            <a href="" className="underline font-roboto-regular">
              limitsApply
            </a>
          </div>
        )}
        {id === 3 && (
          <div className="text-[12px] leading-[16px] text-[#e3e3e3]">
           * Prices are collected per year, minimum 2 users
          </div>
        )}
      </div>
    </div>
  );
}
