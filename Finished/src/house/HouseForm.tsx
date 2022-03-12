import React, { useState } from "react";
import { HouseType } from "../types/house";

type Args = {
  house: HouseType;
  submitted: (house: HouseType) => void;
};

const HouseForm = ({ house, submitted }: Args) => {
  const [houseState, setHouseState] = useState(house);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHouseState({ ...houseState, [e.target.id]: e.target.value });
  };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    submitted(houseState);
  };
  return (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          id="address"
          value={houseState.address}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          className="form-control"
          placeholder="Country"
          value={houseState.country}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          className="form-control"
          placeholder="Description"
          value={houseState.description}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          className="form-control"
          placeholder="Price"
          value={houseState.price}
          onChange={onChange}
        />
      </div>
      <button
        className="btn btn-primary mt-2"
        disabled={
          !houseState.address || !houseState.country || !houseState.price
        }
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default HouseForm;
