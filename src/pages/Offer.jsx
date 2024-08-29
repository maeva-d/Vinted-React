import axios from "axios";
import { useState, useEffect } from "react";
// Pour pouvoir utiliser des params
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Je déstructure la clé id de useParams()
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //Pas de guillemets avec les backticks!
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // Je rajouter id dans le tableau pour éviter des messages d'erreur (ça ne change rien à notre code)
  }, [id]);

  return isLoading ? (
    <p>Chargement de la page...</p>
  ) : (
    <main>
      <section>
        <p>{data.product_price}</p>
        <img src={data.product_image.secure_url} alt={data.product_name} />
        {/* data.product.details[allIndexes] = { MARQUE : QQc,TAILE : QQc} etc x4 */}
        {data.product_details.map((detail, index) => {
          const keys = Object.keys(detail);
          console.log("keys ==>", keys);
          const key = keys[0];
          console.log("key =>", key);

          return (
            <p key={index}>
              {key} : {detail[key]}
            </p>
          );
        })}
      </section>
    </main>
  );
};

export default Offer;
