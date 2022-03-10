import { useState } from "react";
import useBids from "../hooks/useBids";
import { HouseType } from "../types/house";

type Props = {
  house: HouseType;
};

const Bids = ({ house }: Props) => {
  const [visible, setVisible] = useState(false);
  const bids = visible ? useBids(house) : [];
  if (!visible)
    return <button onClick={(e) => setVisible(true)}>Show bids</button>;
  return (
    <table className="table table-sm">
      <th>Bidder</th>
      <th>Amount</th>
      {bids.map((b) => (
        <tr>
          <td>{b.bidderName}</td>
          <td>{b.amount}</td>
        </tr>
      ))}
    </table>
  );
};

export default Bids;
