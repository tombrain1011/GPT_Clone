import { useState } from "react";

export default function Question({ content, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [displayContent, setDisplayContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save logic (e.g., update the state or make an API call)
    if(onSave) {
      onSave(editContent);
    }
    setDisplayContent(editContent);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditContent(displayContent); // Reset to original content
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditContent(e.target.value);
  };

  return (
    <div className="flex justify-center mx-[12px] mt-[19px] mb-[20px]">
      <div className="w-full max-w-[768px] bg-transparent flex items-start justify-end">
        <div className="flex mt-[3px] max-w-[273px] md:max-w-[505px] bg-[#2F2F2F] rounded-[24px] relative">
          <div className="text-[#ececec] text-[16px] mx-[20px] my-[10px]">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={editContent}
                  onChange={handleChange}
                  className="bg-[#2F2F2F] text-[#ececec] w-full rounded-[8px] p-[5px]"
                />
                <div className="flex mt-[10px]">
                  <button
                    onClick={handleSaveClick}
                    className="bg-blue-500 text-white px-[8px] py-[2px] rounded-[5px] mr-[8px]"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 text-white px-[8px] py-[2px] rounded-[5px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center">
                  <p style={{paddingRight: "10px"}}>{displayContent}</p>
                  <button
                    onClick={handleEditClick}
                    className="ml-[8px] text-green-400 hover:text-gray-200"
                  >
                    {/* Replace with your preferred pencil icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L4 13.172V16h2.828l10.586-10.586a2 2 0 000-2.828zM15.586 2L18 4.414 14.414 8 12 5.586 15.586 2zM2 18v-2.586l8.293-8.293 2.586 2.586L4.586 18H2z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
