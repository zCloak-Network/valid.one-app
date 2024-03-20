import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-end transition-opacity duration-300`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className={`transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } max-h-3/4 w-full overflow-y-auto ${isOpen ? "animate-slideUp" : "animate-slideDown"}`}
      >
        {children}
      </div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
};

export default Drawer;
