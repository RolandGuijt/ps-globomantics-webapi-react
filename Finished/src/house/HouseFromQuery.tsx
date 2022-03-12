import { useParams } from "react-router-dom";
import House from ".";
import useFetchHouses from "../hooks/useFetchHouses";

const HouseFromQuery = () => {
  const { id } = useParams();
  const { data } = useFetchHouses();
  if (!id || !data) return <div>House id not found.</div>;
  const house = data.find((h) => h.id === parseInt(id));

  if (!house) return <div>House not found.</div>;
  return <House house={house}></House>;
};

export default HouseFromQuery;
