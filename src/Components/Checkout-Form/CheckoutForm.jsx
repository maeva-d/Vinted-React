import "./checkout-form.scss";

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
    setIsPaying(true);
    setErrorMessage("");
    try {
      const { error: submitError } = await elements.submit();

      if (elements == null) {
        return;
      }

      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        "https://site--backend-vinted--rfd99txfpp4t.code.run/payment",
        {
          title: title,
          amount: amount,
        }
      );
      console.log("response.data =>", response.data); // OK !
      const clientSecret = response.data.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        confirmParams: {
          return_url:
            "https://site--backend-vinted--rfd99txfpp4t.code.run/offers/",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }

    setIsPaying(false);
  };

  return success ? (
    <p>Transaction validée</p>
  ) : (
    <main className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Résumé de la commande</h2>
        <ul>
          <p>Commande</p> <span>{amount} €</span>
        </ul>
        <ul>
          <p>Frais protection acheteurs</p> <span>{protectionFees} €</span>
        </ul>
        <ul>
          <p>Frais de port</p> <span>{shippingFees} €</span>
        </ul>
        <ul>
          <span>Total</span>
          <span>{amount + protectionFees + shippingFees} €</span>
        </ul>
        <PaymentElement />
        <button disabled={!stripe || !elements || isPaying}>
          Confirmer votre achat
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default CheckoutForm;
