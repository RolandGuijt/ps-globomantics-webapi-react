import { useAddHouse } from "../hooks/HouseHooks";
import { House } from "../types/house";
import HouseForm from "./HouseForm";

const HouseNew = () => {
  const addHouseMutation = useAddHouse();

  const house: House = {
    address: "",
    country: "",
    description: "",
    price: 0,
    id: 0,
    photo: "",
    bids: [],
  };

  return (
    <HouseForm
      house={house}
      submitted={(house) => addHouseMutation.mutate(house)}
    />
  );
};

export default HouseNew;
