import "./house.css";
import Bids from "./Bids";
import { Link, useParams } from "react-router-dom";
import { useDeleteHouse, useFetchHouse } from "../hooks/HouseHooks";
import ApiStatus from "../apiStatus";

const HouseDetail = () => {
  const { id } = useParams();
  if (!id) return <div>House id not found.</div>;
  const houseId = parseInt(id);

  const { data, status, isSuccess } = useFetchHouse(houseId);
  const deleteHouseMutation = useDeleteHouse();

  if (!isSuccess) return <ApiStatus status={status} />;

  if (!data) return <div>House not found.</div>;

  const OnDeleteClick = () => {
    if (confirm("Are you sure?")) deleteHouseMutation.mutate(data);
  };

  return (
    <div>
      <div className="row mt-2">
        <h5 className="col-md-12">{data.country}</h5>
      </div>
      <div className="row">
        <h3 className="col-md-12">{data.address}</h3>
      </div>
      <div className="row">
        <div className="col-md-7">
          <img src={data.photo} alt="House pic" />
        </div>
        <div className="col-md-5">
          <p className="price">${data.price}</p>
          <p>{data.description}</p>
          <p>
            <Bids house={data} />
          </p>
        </div>
      </div>
      <div className="row">
        <Link className="btn btn-primary" to={`/house/edit/${data.id}`}>
          Edit
        </Link>
        <button className="btn btn-danger" onClick={() => OnDeleteClick()}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HouseDetail;
