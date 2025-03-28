// dependencies
import React from "react";
import { NavLink, useLocation } from "react-router";

type LinkProps = {
  item: {
    title: string;
    route: string;
  };
};

const SubRoute: React.FC<LinkProps> = ({ item }) => {
  const location = useLocation();

  const isActive = location.pathname.includes(item.route);

  return (
    <NavLink
      to={item.route}
      className={`subroute ${isActive ? "subroute_active" : ""}`}
    >
      {item.title}
    </NavLink>
  );
};

export default SubRoute;
