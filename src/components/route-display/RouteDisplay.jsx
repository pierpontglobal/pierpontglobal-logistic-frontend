import React from "react";
import RouteInfo from "./route-info/RouteInfo";

const addresses = [
  // For testing purposes
  { text: "Chicago", value: "chicago, il" },
  { text: "St Louis", value: "st louis, mo" },
  { text: "Joplin, MO", value: "joplin, mo" },
  { text: "Oklahoma City", value: "oklahoma city, ok" },
  { text: "Amarillo", value: "amarillo, tx" },
  {
    text: "Santo Domingo, Dominican Republic",
    value: "Santo Domingo, Dominican Republic"
  },
  {
    text: "Santiago, Dominican Republic",
    value: "Santiago, Dominican Republic"
  }
];

function RouteDisplay(props) {
  return <RouteInfo addresses={addresses} />;
}

export default RouteDisplay;
