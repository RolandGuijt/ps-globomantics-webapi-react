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
    <div>
      <table className="table table-sm">
        <th>Bidder</th>
        <th>Amount</th>
        {house.bids &&
          house.bids.map((b) => (
            <tr key={b.id}>
              <td>{b.bidder}</td>
              <td>{b.amount}</td>
            </tr>
          ))}
      </table>
      <div>
        <input
          id="bidder"
          type="text"
          value={bid.bidder}
          onChange={onChange}
          placeholder="Bidder"
        ></input>
        <input
          id="amount"
          type="number"
          value={bid.amount}
          onChange={onChange}
          placeholder="Amount"
        ></input>
        <button onClick={() => onBidSubmitClick()}>Add</button>
      </div>
    </div>
  );
};

export default Bids;
