import { useState, useEffect } from "react";
import { Bid } from "../types/bid";
import { HouseType } from "../types/house";

const useBids = (house: HouseType): Bid[] => {
  const [bids, setBids] = useState<Bid[]>([]);

  useEffect(() => {
    const fetchBids = async () => {
      const rsp = await fetch(
        `https://reacthousesapi.azurewebsites.net/getbids/${house.id}`
      );
      const bids = await rsp.json();
      setBids(bids);
    };
    fetchBids();
  }, [house]);

  return bids;
};

export default useBids;
