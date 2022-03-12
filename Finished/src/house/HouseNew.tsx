import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Config from "../config";
import { useClearHousesCache } from "../hooks/useFetchHouses";
import { HouseType } from "../types/house";
import HouseForm from "./HouseForm";

const HouseNew = () => {
  const nav = useNavigate();
  const clearCache = useClearHousesCache();
  const mutation = useMutation((h: HouseType) =>
    fetch(`${Config.baseApiUrl}/houses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(h),
    })
  );

  const submitted = (house: HouseType) => {
    mutation.mutate(house);
    clearCache();
    nav("/");
  };

  const house: HouseType = {
    address: "",
    country: "",
    description: "",
    price: 0,
    id: 0,
    photo: "",
  };

  return <HouseForm house={house} submitted={submitted} />;
};

export default HouseNew;
