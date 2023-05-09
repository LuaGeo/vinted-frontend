import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchOffer = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(id);
        setOffer(response.data);
        setIsLoading(false);
      };
      fetchOffer();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="offerPage">
      <div className="offerContainer container">
        <img
          src={offer.product_image.secure_url}
          alt={offer.product_description}
        />
        <div>
          <div className="offerInfosContainer">
            <h2>{offer.product_price} €</h2>
            <div>
              <ul>
                {offer.product_details.map((detail, index) => {
                  return <li key={index}>{Object.keys(detail)}</li>;
                })}
              </ul>
              <ul>
                {offer.product_details.map((detail, index) => {
                  return <li key={index}>{detail[Object.keys(detail)]}</li>;
                })}
              </ul>
            </div>

            <div>
              <h3>{offer.product_name}</h3>
              <h3>{offer.product_description}</h3>
              <div>
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="avatar"
                  />
                )}
                <h3>{offer.owner.account.username}</h3>
              </div>
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
