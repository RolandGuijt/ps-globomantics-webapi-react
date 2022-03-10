import { useContext } from "react";
import { useParams } from "react-router-dom";
import House from ".";
import HousesContext from "../contexts/housesContext";

const HouseFromQuery = () => {
  const { id } = useParams();
  const allHouses = useContext(HousesContext);
  if (!id) return <div>House id not found.</div>;
  const house = allHouses.find((h) => h.id === parseInt(id));

  if (!house) return <div>House not found.</div>;
  return <House house={house}></House>;
};

export default HouseFromQuery;
