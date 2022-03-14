import React, { useState } from "react";
import toBase64 from "../toBase64";
import { House } from "../types/house";

type Args = {
  house: House;
  submitted: (house: House) => void;
};

const HouseForm = ({ house, submitted }: Args) => {
  const [houseState, setHouseState] = useState(house);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHouseState({ ...houseState, [e.target.id]: e.target.value });
  };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    submitted(houseState);
  };

  const onFileSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.target.files &&
      e.target.files[0] &&
      setHouseState({
        ...houseState,
        photo: await toBase64(e.target.files[0]),
      });
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
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          className="form-control"
          onChange={onFileSelected}
        />
      </div>
      <div>
        <img src={houseState.photo}></img>
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
