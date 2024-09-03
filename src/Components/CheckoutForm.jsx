import axios from "axios";
import { useState } from "react";
// ! important
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const [isPaying, setisPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  return <div>CheckoutForm</div>;
};

export default CheckoutForm;
