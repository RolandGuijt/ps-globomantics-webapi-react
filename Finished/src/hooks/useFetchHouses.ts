import { useQuery, useQueryClient } from "react-query";
import Config from "../config";
import { HouseType } from "../types/house";

const fetchHouses = async (): Promise<HouseType[]> => {
  const rsp = await fetch(`${Config.baseApiUrl}/houses`);
  return rsp.json();
};

const useFetchHouses = () => {
  return useQuery("houses", fetchHouses, { staleTime: 120000 });
};

const useClearHousesCache = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries("houses");
  };
};

export default useFetchHouses;
export { useClearHousesCache };
