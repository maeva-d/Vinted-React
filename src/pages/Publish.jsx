import "./publish.css";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);

  // const [cloudinaryPic, setCloudinaryPic] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", location);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      // Est-ce que j'ai bien un response.data.secure_url ?
    } catch (error) {
      console.log(error);
    }
  };

  return !token ? (
    <Navigate to={"/login"} />
  ) : (
    <main className="publish-main">
      <div className="container">
        <h2 className="publish-h2">Vends ton article</h2>
        <form onSubmit={handleSubmit} className="publish-form">
          <section className="publish-section">
            <input
              // Ici on veut POSTER UNE PHOTO : c'est un input de type file
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
              className="custom-file-input"
            />
          </section>
          <section className="publish-section">
            <div className="publish-line">
              <label htmlFor="title">Titre</label>
              <input
                className="publish-input"
                type="text"
                id="title"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="publish-line">
              <label htmlFor="description">Décris ton article</label>
              <textarea
                className="publish-input"
                id="description"
                placeholder="ex: porté quelquefois, taille correctement"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="publish-section">
            <div className="publish-line">
              <label htmlFor="brand">Marque</label>
              <input
                className="publish-input"
                type="text"
                id="brand"
                placeholder="ex: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="publish-line">
              <label htmlFor="size">Taille</label>
              <input
                className="publish-input"
                type="text"
                id="size"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />{" "}
            </div>
            <div className="publish-line">
              <label htmlFor="color">Couleur</label>
              <input
                className="publish-input"
                type="text"
                id="color"
                placeholder="ex: Jaune"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="publish-line">
              <label htmlFor="condition">Etat</label>
              <input
                className="publish-input"
                type="text"
                id="condition"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="publish-line">
              <label htmlFor="location">Lieu</label>
              <input
                className="publish-input"
                type="text"
                id="location"
                placeholder="ex: Paris"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="publish-section">
            <div className="publish-line">
              <label htmlFor="price">Prix</label>
              <input
                className="publish-input"
                type="text"
                id="price"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
          </section>
          <button className="publish-button">Ajouter</button>
        </form>
      </div>
    </main>
  );
};

export default Publish;
