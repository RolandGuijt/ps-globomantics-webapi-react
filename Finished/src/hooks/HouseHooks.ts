import { useNavigate } from "react-router-dom";
import { House } from "./../types/house";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Config from "../config";

const handleErrors = async (response: Response) => {
  if (!response.ok) {
    //fetch api doesn't reject the promise for a non-200 status code so we have to do it:
    if (response.status === 400)
      //todo: find out a way to show this in the UI
      throw new Error(`Validation errors: ${response.json()}`);
    throw new Error(`Error code: ${response.status} ${response.statusText}`);
  }
};

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
        handleErrors(resp);
        queryClient.invalidateQueries("houses");
        nav("/");
      },
    }
  );
};

const useUpdateHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<Response, Error, House>(
    (h) =>
      fetch(`${Config.baseApiUrl}/houses`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(h),
      }),
    {
      onSuccess: (resp, house) => {
        handleErrors(resp);
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
        handleErrors(resp);
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
