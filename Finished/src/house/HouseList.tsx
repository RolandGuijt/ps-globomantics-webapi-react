import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../apiStatus";
import { useFetchHouses } from "../hooks/HouseHooks";
import { House } from "../types/house";

const HouseList = () => {
  const nav = useNavigate();
  const { data, status, isSuccess } = useFetchHouses();

  const setActive = (house: House) => {
    nav(`/house/${house.id}`);
  };

  if (!isSuccess) return <ApiStatus status={status}></ApiStatus>;

  return (
    <div>
      <div className="row">
        <h5 className="themeFontColor text-center">
          Houses currently on the market
        </h5>
        <hr />
      </div>
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
      <Link className="btn btn-primary" to="/house/new">
        Add
      </Link>
    </div>
  );
};

export default HouseList;
