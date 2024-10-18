"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  isContentHidden: boolean;
  isOpenMobileView: boolean;
  isOptionClick: boolean;
  toggleSidebar: () => void;
  toggleOpenSidebarMobile: () => void;
  toggleCloseSidebarMobile: () => void;
  handleClickOption: (state: any) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenMobileView, setIsOpenMobileView] = useState(false);
  const [isContentHidden, setIsContentHidden] = useState(false);
  const [isOptionClick, setIsOptionClick] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setIsContentHidden(!isContentHidden);
  };

  const toggleOpenSidebarMobile = () => {
    setIsOpenMobileView(true);
  };

  const toggleCloseSidebarMobile = () => {
    setIsOpenMobileView(false);
  };

  const handleClickOption = (state) => {
    setIsOptionClick(state);
  };

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isOpenMobileView,
        isContentHidden,
        isOptionClick,
        toggleSidebar,
        toggleOpenSidebarMobile,
        toggleCloseSidebarMobile,
        handleClickOption,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
