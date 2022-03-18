import React from "react";
import { FiX } from "react-icons/fi";
import "./slidemenu.scss";

interface SlideMenuOpened {
  opened: boolean;
  close: () => void;
  title: string;
  width?: string;
}

const SlideMenu: React.FC<SlideMenuOpened> = ({
  children,
  opened,
  title,
  close,
  width,
}) => {
  return (
    <div
      className={`overlay ${opened ? "active" : ""}`}
      style={{ "--width": width } as React.CSSProperties}
    >
      <div className="menu">
        <div className="menu-header">
          <div className="menu-title">{title}</div>
          <div className="menu-x" onClick={close}>
            <FiX />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SlideMenu;
