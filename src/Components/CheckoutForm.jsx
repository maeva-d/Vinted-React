import "../Components/checkoutForm.css";

import axios from "axios";
import { useState } from "react";
// ! important
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ title, amount }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  let protectionFees = 5;
  let shippingFees = 10;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsPaying(true);
      if (elements == null) {
        return;
      }

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: amount,
        }
      );
      console.log(response.data); // OK !
      const clientSecret = response.data.client_secret;
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    // ma fonction est finie j'arrete le loading
    setIsPaying(false);
  };

  return success ? (
    <p>Transaction validée</p>
  ) : (
    <form className="checkout-container" onSubmit={handleSubmit}>
      <h2 className="pay-h2">Résumé de la commande</h2>
      <div className="pay-line">
        <p>Commande</p> <span>{amount} €</span>
      </div>
      <div className="pay-line">
        <p>Frais protection acheteurs</p> <span>{protectionFees} €</span>
      </div>
      <div className="pay-line">
        <p>Frais de port</p> <span>{shippingFees} €</span>
      </div>
      <div className="pay-total">
        <span>Total</span>
        <span>{amount + protectionFees + shippingFees} €</span>
      </div>
      <PaymentElement />
      <button
        disabled={!stripe || !elements || isPaying}
        className="pay-button"
      >
        Confirmer votre achat
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
