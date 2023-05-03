import { Link } from "react-router-dom";

const Offers = ({ offer }) => {
  return (
    <Link to="/offer">
      <article>
        <div className="owner">
          {offer.owner.account.avatar && (
            <img src={offer.owner.account.avatar.secure_url} alt="avatar" />
          )}
          <p>{offer.owner.account.username}</p>
        </div>
        <img
          src={offer.product_image.secure_url}
          alt={offer.product_description}
        />
        <div className="infosContainer">
          <h3>{offer.product_price} €</h3>
          {offer.product_details.map((details, index) => {
            return (
              <div key={index}>
                {details.TAILLE && <p>{details.TAILLE}</p>}
                {details.MARQUE && <p className="brand">{details.MARQUE}</p>}
              </div>
            );
          })}
        </div>
      </article>
    </Link>
  );
};
export default Offers;
