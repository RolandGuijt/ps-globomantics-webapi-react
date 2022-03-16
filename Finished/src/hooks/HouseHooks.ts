import { useNavigate } from "react-router-dom";
import { House } from "./../types/house";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Config from "../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import Problem from "../types/problem";

const useFetchHouses = () => {
  return useQuery("houses", async (): Promise<House[]> => {
    const rsp = await fetch(`${Config.baseApiUrl}/houses`);
    return rsp.json();
  });
};

const useFetchHouse = (id: number) => {
  return useQuery(["houses", id], async (): Promise<House> => {
    const rsp = await fetch(`${Config.baseApiUrl}/house/${id}`);
    return rsp.json();
  });
};

const useAddHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation(
    (h: House) =>
      fetch(`${Config.baseApiUrl}/houses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(h),
      }),
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries("houses");
        nav("/");
      },
    }
  );
};

const useUpdateHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError<Problem>, House>(
    (h) => axios.put(`${Config.baseApiUrl}/houses`, h),
    {
      onSuccess: (resp, house) => {
        queryClient.invalidateQueries("houses");
        nav(`/house/${house.id}`);
      },
    }
  );
};

const useDeleteHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation(
    (h: House) =>
      fetch(`${Config.baseApiUrl}/houses/${h.id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: (resp) => {
        queryClient.invalidateQueries("houses");
        nav("/");
      },
    }
  );
};

export {
  useFetchHouses,
  useFetchHouse,
  useAddHouse,
  useUpdateHouse,
  useDeleteHouse,
};
