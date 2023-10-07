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
        <h3>1</h3>
        <Card />
      </div>
      <div>
        <h3>2</h3>
        <Card />
      </div>
      <div>
        <h3>3</h3>
        <Card />
      </div>
      <div>
        <h3>4</h3>
        <Card />
      </div>
      <div>
        <h3>5</h3>
        <Card />
      </div>
    </Slider>
  );
};

export default InfiniteCarousel;
