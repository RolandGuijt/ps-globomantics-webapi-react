import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ApiStatus from "../apiStatus";
import Config from "../config";
import useFetchHouses, { useClearHousesCache } from "../hooks/useFetchHouses";
import { HouseType } from "../types/house";
import HouseForm from "./HouseForm";

const HouseEdit = () => {
  const { id } = useParams();
  const clearCache = useClearHousesCache();
  const nav = useNavigate();
  if (!id) return <div>Supply a house id for HouseEdit</div>;

  const { data, status, isSuccess } = useFetchHouses();
  const mutation = useMutation((h: HouseType) =>
    fetch(`${Config.baseApiUrl}/houses`, {
      method: "PUT",
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

  if (!isSuccess || !data) return <ApiStatus status={status} />;
  const house = data.filter((h) => h.id === parseInt(id))[0];
  return <HouseForm house={house} submitted={submitted} />;
};

export default HouseEdit;
