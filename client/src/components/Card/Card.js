import "./Card.css";

const Card = () => {
  return (
    <div className="homeCard">
      <h3 className="cardTitle">Counter Strike 2</h3>
      <img
        className="cardImage"
        src="https://img.asmedia.epimg.net/resizer/7Zw-cfWLsK14YBHgHuGMiXLzFeA=/1200x1200/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/LNRBE2BYWRBLTLY7JIYHHV6D74.png"
      ></img>
      <div className="infoCard">
        <p>Echos Open: 0</p>
        <p className="cardClick">Click for more info</p>
      </div>
    </div>
  );
};

export default Card;
