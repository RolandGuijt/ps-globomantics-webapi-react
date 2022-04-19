import { useAddHouse } from "../hooks/HouseHooks";
import { House } from "../types/house";
import ValidationSummary from "../ValidationSummary";
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
  };

  return (
    <>
      {addHouseMutation.isError && (
        <ValidationSummary error={addHouseMutation.error} />
      )}
      <HouseForm
        house={house}
        submitted={(house) => addHouseMutation.mutate(house)}
      />
    </>
  );
};

export default HouseAdd;
