import { useState } from "react";
import { useAddBid } from "../hooks/BidHooks";
import { Bid } from "../types/bid";
import { House } from "../types/house";

type Props = {
  house: House;
};

const Bids = ({ house }: Props) => {
  const addBidMutation = useAddBid();
  const emptyBid = {
    id: 0,
    houseId: house.id,
    bidder: "",
    amount: 0,
  };
  const [bid, setBid] = useState<Bid>(emptyBid);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBid({ ...bid, [e.target.id]: e.target.value });
  };

  const onBidSubmitClick = () => {
    addBidMutation.mutate(bid);
    setBid(emptyBid);
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {house.bids &&
                house.bids.map((b) => (
                  <tr key={b.id}>
                    <td>{b.bidder}</td>
                    <td>{b.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <input
            id="bidder"
            className="h-100"
            type="text"
            value={bid.bidder}
            onChange={onChange}
            placeholder="Bidder"
          ></input>
        </div>
        <div className="col-4">
          <input
            id="amount"
            className="h-100"
            type="number"
            value={bid.amount}
            onChange={onChange}
            placeholder="Amount"
          ></input>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={() => onBidSubmitClick()}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default Bids;
