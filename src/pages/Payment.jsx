import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = ({ userId }) => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: `${userId}`,
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const responseFromBackend = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: title,
          amount: price,
        }
      );
      console.log(responseFromBackend.data.status);
      if (responseFromBackend.data.status === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const protectionTax = 0.4;
  const portTax = 0.8;
  const total = price + protectionTax + portTax;

  return (
    <div className="paymentBackground">
      <form onSubmit={handlePaymentSubmit}>
        <p>Résumé de la commande</p>
        <div className="resumePayment">
          <div>
            <h4>Commande</h4>
            <h4>{price.toFixed(2)} €</h4>
          </div>
          <div>
            <h4>Frais protection acheteurs</h4>{" "}
            <h4> {protectionTax.toFixed(2)} €</h4>
          </div>
          <div>
            <h4>Frais de port</h4>
            <h4>{portTax.toFixed(2)} €</h4>
          </div>
        </div>
        <div className="totalPayment">
          <h4>Total</h4>
          <h4>{total.toFixed(2)} €</h4>
        </div>
        <h4 className="messageBeforePayment">
          Il ne vous reste plus qu'une étape pour vous offrir
          <span className="bolded"> {title}</span>. Vous allez payer
          <span className="bolded">{total}</span> € (frais de protection et
          frais de port inclus).
        </h4>
        <CardElement />

        {completed ? (
          <h4 className="validateMessage">Paiement validé ✅</h4>
        ) : (
          <button type="submit" disabled={isLoading}>
            Pay
          </button>
        )}
      </form>
    </div>
  );
};

export default Payment;
