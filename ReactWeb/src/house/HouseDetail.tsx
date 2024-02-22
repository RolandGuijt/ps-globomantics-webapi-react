import Bids from "../bids/Bids";
import { Link, useParams } from "react-router-dom";
import { useDeleteHouse, useFetchHouse } from "../hooks/HouseHooks";
import ApiStatus from "../apiStatus";
import { currencyFormatter } from "../config";
import defaultImage from "./defaultPhoto";

const HouseDetail = () => {
  const { id } = useParams();
  if (!id) throw Error("House id not found");
  const houseId = parseInt(id);

  const { data, status, isSuccess } = useFetchHouse(houseId);

  const deleteHouseMutation = useDeleteHouse();

  if (!isSuccess) return <ApiStatus status={status} />;

  if (!data) return <div>House not found.</div>;

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <img
            className="img-fluid"
            src={data.photo ? data.photo : defaultImage}
            alt="House pic"
          />
        </div>
        <div className="row mt-3">
          <div className="col-2">
            <Link
              className="btn btn-primary w-100"
              to={`/house/edit/${data.id}`}
            >
              Edit
            </Link>
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                if (window.confirm("Are you sure?"))
                  deleteHouseMutation.mutate(data);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="row mt-2">
          <h5 className="col-12">{data.country}</h5>
        </div>
        <div className="row">
          <h3 className="col-12">{data.address}</h3>
        </div>
        <div className="row">
          <h2 className="themeFontColor col-12">
            {currencyFormatter.format(data.price)}
          </h2>
        </div>
        <div className="row">
          <div className="col-12 mt-3">{data.description}</div>
        </div>
        <Bids house={data} />
      </div>
    </div>
  );
};

export default HouseDetail;
