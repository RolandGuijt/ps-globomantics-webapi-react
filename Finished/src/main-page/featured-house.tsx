import House from "../house";
import { HouseType } from "../types/house";

type Args = {
  house: HouseType | undefined;
};

const FeaturedHouse = ({ house }: Args) => {
  if (house)
    return (
      <div data-testid="featuredhouse">
        <div className="row featuredHouse">
          <h3 className="col-md-12 text-center">Featured house</h3>
        </div>
        <House house={house} />
      </div>
    );
  return <div>No featured house at this time</div>;
};

export default FeaturedHouse;
