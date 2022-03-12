import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import ApiStatus from "../apiStatus";
import Config from "../config";
import useFetchHouses from "../hooks/useFetchHouses";
import { HouseType } from "../types/house";
import HouseForm from "./HouseForm";

const HouseEdit = () => {
  const { id } = useParams();
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

  if (!id) return <div>Supply a house id for HouseEdit</div>;
  if (!isSuccess || !data) return <ApiStatus status={status} />;

  const house = data.filter((h) => h.id === parseInt(id))[0];

  return <HouseForm house={house} submitted={(h) => mutation.mutate(h)} />;
};

export default HouseEdit;
