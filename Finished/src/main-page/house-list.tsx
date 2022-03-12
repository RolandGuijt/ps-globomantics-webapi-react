import { useNavigate } from "react-router-dom";
import ApiStatus from "../apiStatus";
import useFetchHouses from "../hooks/useFetchHouses";
import { HouseType } from "../types/house";

const HouseList = () => {
  const nav = useNavigate();
  const { data, status, isSuccess } = useFetchHouses();

  const setActive = (house: HouseType) => {
    nav(`/house/${house.id}`);
  };

  if (!isSuccess) return <ApiStatus status={status}></ApiStatus>;

  return (
    <div className="mt-2">
      <table className="table table-hover">
        <tbody>
          {data &&
            data.map((h) => (
              <tr key={h.id} onClick={() => setActive(h)}>
                <td>{h.address}</td>
                <td>{h.country}</td>
                <td>{h.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <a className="btn btn-primary" href="/house/new">
        Add
      </a>
    </div>
  );
};

export default HouseList;
