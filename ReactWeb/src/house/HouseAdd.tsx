import { useAddHouse } from "../hooks/HouseHooks";
import { House } from "../types/house";
import HouseForm from "./HouseForm";

const HouseAdd = () => {
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

export default HouseAdd;
