import { Bid } from "./../types/bid";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Config from "../config";

const useAddBid = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation(
    (b: Bid) =>
      fetch(`${Config.baseApiUrl}/bids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(b),
      }),
    {
      onSuccess: (resp, bid) => {
        queryClient.invalidateQueries(["houses", bid.houseId]);
        nav(`/house/${bid.houseId}`);
      },
    }
  );
};

export { useAddBid };
