import React from "react";

interface SlideMenuOpened {
  opened: boolean;
  close: () => void;
  title: string;
}

const SlideMenu: React.FC<SlideMenuOpened> = ({ children, title, close }) => {
  return (
    <div className="overlay">
      <div className="menu">
        <div className="menu-header">
          <div className="menu-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default SlideMenu;
