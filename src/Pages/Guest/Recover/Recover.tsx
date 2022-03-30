import React from "react";
import { useState } from "react";

function PasswordRecovery() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData,  email : e.target.value });
  };

  const onSubmit = (e:React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(formData);
    alert('Vous allez recevoir un email pour le changement de votre mot de passe')
  };

  const { email } = formData;

  return (
    <div className="login">
      <h1>Recuperation du mot de passe</h1>
      <form onSubmit={(e) => onSubmit(e)} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            value={email}
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe:</label>
          <input
            type="email"
            placeholder="Confirmation"
            name="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
}

export default PasswordRecovery;