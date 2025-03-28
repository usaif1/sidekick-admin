// dependencies
import React from "react";
import { AccordionItem } from "@szhsin/react-accordion";
import { NavLink } from "react-router";

// components
import Text from "../Text";

// types
import { Icon } from "@phosphor-icons/react";

type Props = {
  item: {
    title: string;
    route: string;
    icon: Icon;
  };
};

const HomeRoute: React.FC<Props> = ({ item }) => {
  const isActive = location.pathname === item.route;

  return (
    <AccordionItem
      className="w-full"
      itemKey="/"
      header={() => (
        <NavLink to="/" className={`route`}>
          <div className={`${isActive ? "font-bold" : ""}`}>
            <item.icon
              color="white"
              size={20}
              weight={isActive ? "bold" : "regular"}
            />
            <Text color="text-white">Home</Text>
          </div>
        </NavLink>
      )}
    />
  );
};

export default HomeRoute;
