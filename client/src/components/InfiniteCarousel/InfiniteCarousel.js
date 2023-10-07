import Slider from "infinite-react-carousel";
const InfiniteCarousel = () => {
  return (
    <Slider
      slidesToShow={2}
      centerMode={true}
      initialSlide={1}
      autoplay={true}
      autoplaySpeed={4000}
      wheel={true}
      arrows={false}
      dots
    >
      <div>
        <h3>1</h3>
        <img src="https://picsum.photos/500/500"></img>
      </div>
      <div>
        <h3>2</h3>
        <img src="https://picsum.photos/500/500"></img>
      </div>
      <div>
        <h3>3</h3>
        <img src="https://picsum.photos/500/500"></img>
      </div>
      <div>
        <h3>4</h3>
        <img src="https://picsum.photos/500/500"></img>
      </div>
      <div>
        <h3>5</h3>
        <img src="https://picsum.photos/500/500"></img>
      </div>
    </Slider>
  );
};

export default InfiniteCarousel;
