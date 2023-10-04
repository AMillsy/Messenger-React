import "./HomeShowcase.css";

//svgIcon = Material ui icon used
//text is what you are putting with the image
//num to so that they will alternate when showing
const HomeShowcase = ({ svgIcon, text, num }) => {
  const isEven = num % 2 === 0;

  const flipFlop = () => {
    if (isEven) {
      return (
        <>
          <div className="left">{svgIcon}</div>
          <div className="right">
            <p>{text}</p>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="right">
          <p>{text}</p>
        </div>
        <div className="left">{svgIcon}</div>
      </>
    );
  };
  return <div className="showcaseContainer">{flipFlop()}</div>;
};

export default HomeShowcase;
