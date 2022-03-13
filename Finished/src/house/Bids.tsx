import ApiStatus from "../apiStatus";
import { House } from "../types/house";

type Props = {
  house: House;
};

const Bids = ({ house }: Props) => {
  return (
    <table className="table table-sm">
      <th>Bidder</th>
      <th>Amount</th>
      {house.bids &&
        house.bids.map((b) => (
          <tr>
            <td>{b.bidder}</td>
            <td>{b.amount}</td>
          </tr>
        ))}
    </table>
  );
};

export default Bids;
