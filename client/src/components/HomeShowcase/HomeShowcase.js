import "./HomeShowcase.css";

//ImgSrc = source for image
//text is what you are putting with the image
//num to so that they will alternate when showing
const HomeShowcase = ({ imgSrc, text, num }) => {
  return (
    <div className="showcaseContainer">
      <div className="left">
        <img src="https://placekitten.com/400/400"></img>
      </div>
      <div className="right">
        <p>Add friends...</p>
      </div>
    </div>
  );
};

export default HomeShowcase;
