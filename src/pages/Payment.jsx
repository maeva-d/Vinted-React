// On installe react-stripe.js et on l'importe:
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// ! important pour faire passer des infos de Offer à Payment
import { Navigate, useLocation } from "react-router-dom";

// On crée ensuite le composant CheckoutForm que l'on importe
import CheckoutForm from "../Components/CheckoutForm";
// clé publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  // ! important
  const location = useLocation();
  const { title, amount } = location.state;
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
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} amount={amount} />
    </Elements>
  );
};

export default Payment;
