import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function PasswordConfirm() {


  const params = useParams();


  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  // recuperation du token de l'URL pour prochaine utilisation
  const { token } = useParams();

  const onChange = (e:React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e:React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(formData);
    alert('password changed ! ')


  };

  const { password, password2 } = formData;

  //  if (isAuthenticated) return <Redirect to="/" />;


  return (
      <div className="login">
        <h1>Changement de mot de passe</h1>
        <form onSubmit={(e) => onSubmit(e)} className="login-form">
          <div className="form-group">
            <label htmlFor="fname">Nouveau Mot de passe:</label>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fname">Confirmer le nouveau mot de passe:</label>
            <input
              type="password"
              placeholder="Confirmation"
              name="password2"
              onChange={(e) => onChange(e)}
            />
          </div>
          {password == password2 ? (
            <label className="" htmlFor="fname">
              Mot de passses sont les memes.
            </label>
          ) : (
            <label className="" htmlFor="fname">
              Les mots de passes ne sont pas les memes.
            </label>
          )}

          <div className="form-group">
            <input type="submit" value="Envoyer Un Courriel" />
          </div>
        </form>
      </div>
  );
};


export default PasswordConfirm;