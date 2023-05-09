import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmitNewArticle = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="publishBackground">
      <div className="container publishContainer">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmitNewArticle}>
          <div className="publishPictureContainer">
            <label className="inputFile">
              <input
                type="file"
                onChange={(event) => {
                  // createObjectURL(event.target.files[0]);
                  setPicture(event.target.files[0]);
                }}
              />
              + Ajoute une photo
            </label>
          </div>

          <section>
            <div>
              <h3>Titre</h3>
              <input
                type="text"
                placeholder="ex.: Chemise Sézane verte"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>Décris ton article</h3>
              <input
                type="text"
                placeholder="ex.: porté quelques fois, teille correctement etc."
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </section>

          <section>
            <div>
              <h3>Marque</h3>
              <input
                type="text"
                placeholder="ex.: Zara"
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>Taille</h3>
              <input
                type="text"
                placeholder="ex.: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>Couleur</h3>
              <input
                type="text"
                placeholder="ex.: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>État</h3>
              <input
                type="text"
                placeholder="ex.: Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div>
              <h3>Lieu</h3>
              <input
                type="text"
                placeholder="ex.: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </section>

          <section>
            <div>
              <h3>Prix</h3>
              <div>
                <input
                  type="text"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div>
                  <input className="publishCheckBox" type="checkBox" />
                  <h4>Je suis intéressé(e) par les échanges</h4>
                </div>
              </div>
            </div>
          </section>
          <div className="publishButton">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Publish;
