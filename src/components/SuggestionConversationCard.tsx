export default function SuggestionConversationCard({ logo, description }) {
  return (
    <div
      className="flex-col max-w-[160px] rounded-[16px] border-[1px] border-[#383838] p-[12px] cursor-pointer hover:bg-[#2f2f2f] transition-all duration-100"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 2px 0px, rgba(0, 0, 0, 0.02) 0px 4px 6px 0px",
      }}
    >
      <div className="">{logo}</div>
      <div className="text-[15px] text-[#9b9b9b] leading-[22.5px] mt-[8px]">
        {description}
      </div>
    </div>
  );
}
