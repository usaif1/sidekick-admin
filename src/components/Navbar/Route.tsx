// dependencies
import React from "react";
import { CaretUp } from "@phosphor-icons/react";
import { Icon } from "@phosphor-icons/react";

type Props = {
  item: {
    title: string;
    icon: Icon;
    route: string;
  };
  isOpen: boolean;
};

const Route: React.FC<Props> = ({ item, isOpen }) => {
  const isActive = location.pathname.includes(item.route);

  return (
    <div className={`route ${isActive ? "route_active" : ""}`}>
      <div>
        <item.icon size={20} weight={isActive ? "bold" : "regular"} />
        {item.title}
      </div>
      <CaretUp
        className={`caret_icon ${isOpen ? "-rotate-180" : "rotate-0"}`}
      />
    </div>
  );
};

export default Route;
