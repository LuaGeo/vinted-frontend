import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
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
      const CardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(CardElement, {
        name: stripeResponse.token.id,
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
      console.log(responseFromBackend.data);
      if (responseFromBackend.data === "succeeded") {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="paymentBackground">
      <form onSubmit={handlePaymentSubmit}>
        <h1>Formulaire de paiement</h1>
        <p>Commande: {price}</p>
        <CardElement />
        {completed ? (
          <p>Paiement validé</p>
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
