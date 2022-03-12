import { useMutation } from "react-query";
import Config from "../config";
import { HouseType } from "../types/house";
import HouseForm from "./HouseForm";

const HouseNew = () => {
  const mutation = useMutation((h: HouseType) =>
    fetch(`${Config.baseApiUrl}/houses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(h),
    })
  );

  const house: HouseType = {
    address: "",
    country: "",
    description: "",
    price: 0,
    id: 0,
    photo: "",
  };

  return <HouseForm house={house} submitted={(h) => mutation.mutate(h)} />;
};

export default HouseNew;
