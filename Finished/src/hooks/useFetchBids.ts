import { useQuery } from "react-query";
import Config from "../config";
import { Bid } from "../types/bid";
import { HouseType } from "./../types/house";

const fetchBids = async (house: HouseType): Promise<Bid[]> => {
  const rsp = await fetch(`${Config.baseApiUrl}/bids/${house.id}`);
  return await rsp.json();
};

const useFetchBids = (house: HouseType) => {
  return useQuery(`bids-${house.id}`, () => fetchBids(house));
};

export default useFetchBids;
