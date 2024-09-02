import "./Publish.css";
import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [picture, setPicture] = useState(null);
  const [cloudinaryPic, setCloudinaryPic] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h2>Vends ton article</h2>
      <form>
        {/* onSubmit={handleSubmit}> */}
        {/* <label forhtml="name">"Ajoute une photo"</label> */}
        <input
          // Ici on veut POSTER UNE PHOTO : c'est un input de type file
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
          className="custom-file-input"
        />
        <label forhtml="title">Titre</label>
        <input
          type="text"
          placeholder="ex: Chemise Sézane verte"
          value={title}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label forhtml="description">Décris ton article</label>
        <input
          type="text"
          placeholder="ex: porté quelquefois, taille correctement"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label forhtml="brand">Marque</label>
        <input
          type="text"
          placeholder="ex: Zara"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <label forhtml="size">Taille</label>
        <input
          type="text"
          placeholder="ex: L / 40 / 12"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <label forhtml="color">Couleur</label>
        <input
          type="text"
          placeholder="ex: Jaune"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <label forhtml="condition">Etat</label>
        <input
          type="text"
          placeholder="Neuf avec étiquette"
          value={condition}
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <label forhtml="location">Lieu</label>
        <input
          type="text"
          placeholder="ex: Paris"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <label forhtml="price">Prix</label>
        <input
          type="text"
          placeholder="0,00 €"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button>Ajouter</button>
      </form>
    </main>
  );
};

export default Publish;
