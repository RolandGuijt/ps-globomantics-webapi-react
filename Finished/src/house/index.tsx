import "./house.css";
import { useState } from "react";
import emailIcon from "./Email.png";
import Inquiry from "./Inquiry";
import { HouseType } from "../types/house";
import Bids from "./Bids";

type Args = {
  house: HouseType;
};

const House = ({ house }: Args) => {
  const [inquiryShown, setInquiryShown] = useState(false);
  const inquiryClick = () => {
    setInquiryShown(!inquiryShown);
  };
  return (
    <div>
      <div className="row mt-2">
        <h5 className="col-md-12">{house.country}</h5>
      </div>
      <div className="row">
        <h3 className="col-md-12">{house.address}</h3>
      </div>
      <div className="row">
        <div className="col-md-7">
          <img src={`/images/${house.photo}.jpeg`} alt="House" />
        </div>
        <div className="col-md-5">
          <p className="price">${house.price}</p>
          <p>{house.description}</p>
          <img
            src={emailIcon}
            height="50"
            alt="inquiry"
            onClick={inquiryClick}
          />
          <p>{inquiryShown && <Inquiry house={house} />}</p>
          <p>
            <Bids house={house} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default House;
