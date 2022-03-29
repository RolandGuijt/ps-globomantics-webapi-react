import { Bid } from "./../types/bid";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Config from "../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import Problem from "../types/problem";

const useAddBid = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError<Problem>, Bid>(
    (b) => axios.post(`${Config.baseApiUrl}/bids`, b),
    {
      onSuccess: (resp, bid) => {
        queryClient.invalidateQueries(["houses", bid.houseId]);
        nav(`/house/${bid.houseId}`);
      },
    }
  );
};

export { useAddBid };
