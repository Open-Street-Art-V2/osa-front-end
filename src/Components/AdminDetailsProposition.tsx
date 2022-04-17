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
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { LoginContext } from "./Context/LoginCtxProvider";
import { AnimateAlert, Carousel, ReturnButton } from ".";

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

type PropsDetails = {
  // TODO: any à définir
  data: any;
};

function Details(props: PropsDetails) {
  const { data } = props;
  const numPics = Object.keys(data.pictures).length;

  return (
    <>
      <div className="flex justify-between mb-3 mt-5 mx-2">
        <div className="grow font-bold text-slate-900 dark:text-white text-2xl overflow-hidden">
          {data.title}
        </div>
        <div className="flex text-sky-600 dark:text-darkModeTextSec text-lg items-center overflow-hidden">
          <Moment date={data.created_at} format="DD/MM/YYYY" />
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden">
        <Carousel pictures={data.pictures} nbPictures={numPics} />
      </div>

      <div className="py-4 px-1">
        <blockquote className="my-2">
          <p className="text-slate-600 text-lg dark:text-darkModeTextPrem">
            {data.description}
          </p>
        </blockquote>
        <figcaption className="font-medium">
          {data.artist && (
            <div className="text-lg mt-3 dark:text-white">
              <span className="font-bold dark:text-darkModeTextSec">
                Artiste :
              </span>
              {data.artist}
            </div>
          )}
          <div className="text-sky-700 text-base dark:text-slate-400">
            {data.address}, {data.city}
          </div>
        </figcaption>
      </div>
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
    <Container component="main" maxWidth="xs" className="px-5 pb-20">
      <CssBaseline />

      <div id="btnRetour" className="flex flex-row justify-between mt-4 ">
        <ReturnButton url="/admin/validateProposal" />
        {isContribution && (
          <div id="btnSwitch" className="">
            <FormControlLabel
              control={<Switch name="original" onChange={handleSwitch} />}
              label="Oeuvre d'origine"
            />
          </div>
        )}
      </div>

      {data && (
        <Details data={!isContribution || !original ? data : data.art} />
      )}

      <Box sx={{ pt: 3 }}>
        <AnimateAlert requestError={requestError} requestValid={requestValid} />
      </Box>

      <Box>
        <div className="flex items-center justify-center mt-3 mb-5">
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
                margin: "0px",
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

        <div className="flex items-center justify-center mt-3 mb-5">
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
                margin: "0px",
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
      </Box>
    </Container>
  );
}

export default AdminDetailsProposition;
