import IranMap from "./components/IranMap";
import './Map.css'

function Map() {
  return (
    <>
      <div className="hero" style={{marginTop: '-5rem'}}>
        <IranMap />
      </div>
      <style jsx>{`
        .hero {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
          align-items: flex-start;
        }
        @media only screen and (max-width: 1200px) {
          .hero {
            display: flex;
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </>
  );
}

export default Map;
