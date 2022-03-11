import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@emotion/react";
import { Link } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { LoginContext } from "./Context/LoginCtxProvider";
import { AnimateAlert, Carousel } from ".";

const loadingBtnTheme = createTheme({
  palette: {
    primary: {
      main: "#00ab55",
    },
    secondary: {
      main: "#FF5757",
    },
  },
  shape: {
    borderRadius: "60px",
  },
});

const switchTheme = createTheme({
  palette: {
    primary: {
      main: "#3A4551",
    },
  },
});

type PropsDetails = {
  // TODO: any à définir
  data: any;
};

function Details(props: PropsDetails) {
  const { data } = props;
  const numPics = Object.keys(data.pictures).length;

  return (
    <>
      <Box>
        <p className="pt-7 font-sans text-2xl font-bold ">
          {data.user
            ? `${data.user.firstname} ${data.user.name}`
            : "Oeuvre d'origine"}
        </p>
      </Box>

      <Box>
        <p className="pb-5 text-base text-right text-sky-700 ">
          <Moment date={data.created_at} format="DD/MM/YYYY" />
        </p>
      </Box>

      <Box>
        <Carousel pictures={data.pictures} nbPictures={numPics} />
      </Box>

      <Box>
        <div className="py-4">
          <div className="font-bold text-xl mb-2">Titre : {data.title}</div>
          <blockquote>
            <p className="text-gray-700 text-base">{data.description}</p>
          </blockquote>
          <figcaption className="font-medium">
            {data.artist && (
              <div className="text-lg mt-3 mb-2">
                <span className="font-bold">Artiste : </span>
                {data.artist}
              </div>
            )}
            <div className="text-slate-700 dark:text-slate-500">
              {data.address}, {data.city}
            </div>
          </figcaption>
        </div>
      </Box>
    </>
  );
}

type Props = {
  data: any;
  // eslint-disable-next-line no-unused-vars
  accept: (arg1: number[], arg2: string | undefined) => Promise<Response>;
  // eslint-disable-next-line no-unused-vars
  refuse: (arg1: number, arg2: string | undefined) => Promise<Response>;
};

function AdminDetailsProposition(props: Props) {
  const { t } = useTranslation();
  const { data, accept, refuse } = props;
  const loginCtx = useContext(LoginContext);

  const [isContribution, setIsContribution] = useState<boolean>(false);
  // Dans le cas d'une contribution, permet de définir si c'est la contribution
  // ou l'oeuvre orginale qui doit être affichée.
  const [original, setOriginal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState({
    accept: false,
    refuse: false,
  });

  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestValid, setRequestValid] = useState<string | null>(null);

  useEffect(() => {
    if (data?.art) {
      setIsContribution(true);
    }
  }, [data]);

  const handleAccept = async () => {
    setIsLoading({ ...isLoading, accept: true });
    accept([data?.id], loginCtx.user?.jwt)
      .then(async (res) => {
        if (res?.ok) {
          // const jsonRes = await res.json();
          // const { notFound } = jsonRes;
          // if the proposition has not been found
          // if (notFound?.length !== 0) {
          //   setRequestValid(null);
          //   setRequestError(t("error.occured"));
          // } else {
          setRequestValid(t("valid.proposal"));
          setRequestError(null);
          // }
        } else {
          setRequestValid(null);
          setRequestError(t("server.maintenance"));
        }
      })
      .catch(() => {
        setRequestValid(null);
        setRequestError(t("error.occured"));
      })
      .finally(() => {
        setIsLoading({ ...isLoading, accept: false });
      });
  };

  const handleRefuse = () => {
    setIsLoading({ ...isLoading, refuse: true });

    refuse(data?.id, loginCtx.user?.jwt)
      .then((res) => {
        if (res?.ok) {
          setRequestValid(t("proposal.deleted"));
          setRequestError(null);
        } else {
          setRequestValid(null);
          setRequestError(t("server.maintenance"));
        }
      })
      .catch(() => {
        setRequestValid(null);
        setRequestError(t("error.occured"));
      })
      .finally(() => {
        setIsLoading({ ...isLoading, refuse: false });
      });
  };

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOriginal(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs" className="px-5 pb-16">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          width: "100%",
          display: "absolute",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          id="btnRetour"
          className="flex flex-row place-content-between hTitle pt-4"
        >
          <Link
            to="/admin/validateProposal"
            className="inline-flex items-center"
          >
            <button
              type="button"
              id="retBtn"
              className="inline-flex items-center justify-center w-10 h-10 z-10 ml-4 bg-slate-700 text-white text-2xl rounded-2xl"
            >
              <AiOutlineLeft />
            </button>
          </Link>
        </div>
      </Box>

      {isContribution && (
        <Box>
          <div id="btnSwitch" className="pt-7 -mb-3">
            <ThemeProvider theme={switchTheme}>
              <FormControlLabel
                control={<Switch name="original" onChange={handleSwitch} />}
                label="Oeuvre d'origine"
              />
            </ThemeProvider>
          </div>
        </Box>
      )}

      {data && (
        <Details data={!isContribution || !original ? data : data.art} />
      )}

      <Box>
        <AnimateAlert requestError={requestError} requestValid={requestValid} />
      </Box>

      <Box>
        <div className="px-5 pb-3 pt-3">
          <div className="centreD">
            <ThemeProvider theme={loadingBtnTheme}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isLoading.accept}
                disabled={isLoading.refuse}
                onClick={handleAccept}
                sx={{
                  width: "263px",
                  margin: "10px 0px",
                  height: "54px",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "21px",
                }}
              >
                {t("accept")}
              </LoadingButton>
            </ThemeProvider>
          </div>
        </div>

        <div className="px-5 pb-3">
          <div className="centreD">
            <ThemeProvider theme={loadingBtnTheme}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                loading={isLoading.refuse}
                disabled={isLoading.accept}
                onClick={handleRefuse}
                sx={{
                  width: "263px",
                  margin: "10px 0px",
                  height: "54px",
                  fontWeight: "500",
                  fontSize: "18px",
                  lineHeight: "21px",
                }}
              >
                {t("refuse")}
              </LoadingButton>
            </ThemeProvider>
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default AdminDetailsProposition;
