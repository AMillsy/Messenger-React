import Slider from "infinite-react-carousel";
import Card from "../Card/Card";

const InfiniteCarousel = () => {
  return (
    <Slider
      slidesToShow={2}
      centerMode={true}
      initialSlide={1}
      autoplay={false}
      autoplaySpeed={4000}
      wheel={false}
      arrows={false}
      dots
    >
      <div>
        <Card />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Card />
      </div>
    </Slider>
  );
};

export default InfiniteCarousel;
