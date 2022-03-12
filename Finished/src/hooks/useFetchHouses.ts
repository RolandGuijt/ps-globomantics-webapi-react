import { useQuery } from "react-query";
import Config from "../config";
import { HouseType } from "../types/house";

const fetchHouses = async (): Promise<HouseType[]> => {
  const rsp = await fetch(`${Config.baseApiUrl}/houses`);
  return rsp.json();
};

const useFetchHouses = () => {
  return useQuery("houses", fetchHouses, { staleTime: 120000 });
};

export default useFetchHouses;
