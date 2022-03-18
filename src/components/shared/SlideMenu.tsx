import React from "react";

interface SlideMenuOpened {
  opened: boolean;
  close: () => void;
}

const SlideMenu: React.FC = ({ children }) => {
  return (
    <div className="overlay">
      <div className="menu">{children}</div>
    </div>
  );
};

export default SlideMenu;
