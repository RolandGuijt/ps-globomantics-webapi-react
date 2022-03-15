import { useParams } from "react-router-dom";
import ApiStatus from "../apiStatus";
import { useFetchHouse, useUpdateHouse } from "../hooks/HouseHooks";
import HouseForm from "./HouseForm";

const HouseEdit = () => {
  const { id } = useParams();
  if (!id) return <div>Supply a house id for HouseEdit</div>;
  const houseId = parseInt(id);

  const { data, status, isSuccess } = useFetchHouse(houseId);
  const updateHouseMutation = useUpdateHouse();

  if (!isSuccess) return <ApiStatus status={status} />;
  if (updateHouseMutation.isError)
    return <div>{updateHouseMutation.error.message}</div>;
  return (
    <HouseForm
      house={data}
      submitted={(house) => updateHouseMutation.mutate(house)}
    />
  );
};

export default HouseEdit;
