import axios from "axios";
// On installe react-stripe.js et on l'importe:
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// ! important pour faire passer des infos de Offer à Payment
import { Navigate, useLocation } from "react-router-dom";

// On crée ensuite le composant CheckoutForm que l'on importe
import CheckoutForm from "../Components/CheckoutForm";
// clé publique
const stripePromise = loadStripe(
  "pk_test_51Pux3xP5BeUBwArZYrkTGYEVbS4swgumcNLuVEsVp2WWXGnJXR1L8lJcXYy9JQZF7GY0AawKm9nDbist6Gh2Oxr100Ap1YmMil"
);

const Payment = ({ token }) => {
  // ! important
  const location = useLocation();
  const { title, amount } = location.state;
  //   console.log(title, amount); undefined??
  const options = {
    mode: "payment",
    title: title,
    amount: Number((amount * 100).toFixed(0)),
    currency: "eur",
  };
  // on peut maintenant faire notre route POST
  return !token ? (
    <Navigate to={"/login"} />
  ) : (
    <Element stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Element>
  );
};

export default Payment;
