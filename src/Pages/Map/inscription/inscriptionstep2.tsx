import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { ProgressBar, Step } from "react-step-progress-bar";
// import "react-step-progress-bar/inscription.css";
import "./inscription.css";

type UserSubmitForm = {
    city: string;
    password: string;
    confirmPassword: string;
};

function Inscriptionstep2() {
    const validationSchema = Yup.object().shape({
        city: Yup.string(),

        password: Yup.string()
            .required("Le mot de passe est requis ")
            .min(6, "Le mot de passe doit comporter au moins de 6 caractères")
            .max(20, "Le mot de passe ne doit pas dépasser 20 caractères"),
        confirmPassword: Yup.string()
            .required("La confirmation de mot de passe est requise")
            .oneOf(
                [Yup.ref("password"), null],
                "La confirmation du mot de passe ne correspond pas au mot de passe saisi"
            ),
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
                    placeholder="Ville"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register("city")}
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.city?.message}</div>

                <input
                    type="password"
                    placeholder="Mot de passe*"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register("password")}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.password?.message}</div>

                <input
                    type="password"
                    placeholder="Confirmation mot de passe*"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register("confirmPassword")}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                        }`}
                />
                <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                </div>
                {/*
                <div className="progress">
                    <ProgressBar percent={100} filledBackground="#028144">
                        <Step>
                            {({ accomplished, index }) => (
                                <>
                                    <div
                                        className={`indexedStep ${accomplished ? "accomplished" : null
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
                                        className={`indexedStep ${accomplished ? "accomplished" : null
                                            }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className={"test"}></div>
                                </>
                            )}
                        </Step>
                    </ProgressBar>
                </div>
                                        */}
                <input className="inscrire" type="submit" value="S'inscrire" />
            </form>

            <p> Vous avez un compte ? </p>
            <p>
                <a href="localhost"> Connectez-vous</a>
            </p>
        </div>
    );
}

export default Inscriptionstep2;