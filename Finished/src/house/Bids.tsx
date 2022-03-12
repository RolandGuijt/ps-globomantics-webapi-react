import ApiStatus from "../apiStatus";
import useFetchBids from "../hooks/useFetchBids";
import { HouseType } from "../types/house";

type Props = {
  house: HouseType;
};

const Bids = ({ house }: Props) => {
  const { data, isSuccess, status } = useFetchBids(house);

  if (!isSuccess) return <ApiStatus status={status}></ApiStatus>;

  return (
    <table className="table table-sm">
      <th>Bidder</th>
      <th>Amount</th>
      {data &&
        data.map((b) => (
          <tr>
            <td>{b.bidderName}</td>
            <td>{b.amount}</td>
          </tr>
        ))}
    </table>
  );
};

export default Bids;
