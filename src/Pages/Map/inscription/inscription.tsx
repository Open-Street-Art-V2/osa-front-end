import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { ProgressBar, Step } from "react-step-progress-bar";
//  import "react-step-progress-bar/inscription.css";

import "./inscription.css";

type UserSubmitForm = {
  firstname: string;
  name: string;
  email: string;
  birthdate: Date;
};

function Inscription() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Le prénom est requis")
      .min(3, "Le prénom doit comporter au moins 3 caractères")
      .max(10, "Le prénom doit comporter au plus 10 caractères"),
    name: Yup.string()
      .required("Le nom est requis")
      .min(3, "Le nom doit comporter au moins 3 caractères")
      .max(10, "Le nom doit comporter au plus 10 caractères"),
    email: Yup.string()
      .required("L'email est requis")
      .email("l'email n'est pas valide"),
    birthdate: Yup.string().required("La date de naissance est requise"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Inscription</h2>

        <input
          id="espace"
          type="text"
          placeholder="Prenom*"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("firstname")}
          className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.firstname?.message}</div>

        <input
          type="text"
          placeholder="Nom*"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("name")}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.name?.message}</div>

        <input
          type="text"
          placeholder="Email*"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("email")}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>

        <input
          type="date"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("birthdate")}
          className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errors.birthdate?.message}</div>

        {/* <div className="progress">
        <ProgressBar percent={10} filledBackground="#028144">
          <Step>
            {({ accomplished, index }) => (
              <>
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {index + 1}
                </div>
                <div className={"test"}></div>
              </>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <>
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {index + 1}
                </div>
                <div className={"test"}></div>
              </>
            )}
          </Step>
        </ProgressBar>
                </div> */}

        <input type="submit" value="Suivant" />
      </form>

      <p> Vous avez un compte ? </p>
      <p>
        <a href="localhost"> Connectez-vous</a>
      </p>
    </div>
  );
}

export default Inscription;