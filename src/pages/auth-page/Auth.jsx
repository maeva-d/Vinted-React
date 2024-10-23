import "./auth.scss";
import Modals from "../../Components/header-component/Modals";

// Je récupère la fonction handleToken en props
const Auth = ({ handleToken }) => {
  return (
    <main className="auth dont-show-cross">
      <Modals handleToken={handleToken} />
    </main>
  );
};

export default Auth;
