import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { AnimateAlert, Carousel, ReturnButton } from ".";
import { User } from "../types/user";

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
  const { t } = useTranslation();
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
          <div className="font-bold text-xl mb-2">
            {t("Title")} : {data.title}
          </div>
          <blockquote>
            <p className="text-gray-700 text-base">{data.description}</p>
          </blockquote>
          <figcaption className="font-medium">
            {data.artist && (
              <div className="text-lg mt-3 mb-2">
                <span className="font-bold">{t("artist")} : </span>
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
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isOwnProfil: boolean;
  // in the case of a search
  // eslint-disable-next-line react/require-default-props
  filter?: string;
  // eslint-disable-next-line react/require-default-props
  search?: string;
};

function UserDetailsContribution(props: Props) {
  const { data, user, isOwnProfil, filter, search } = props;
  const [isContribution, setIsContribution] = useState<boolean>(false);
  // Dans le cas d'une contribution, permet de définir si c'est la contribution
  // ou l'oeuvre orginale qui doit être affichée.
  const [original, setOriginal] = useState<boolean>(false);
  const [requestError] = useState<string | null>(null);
  const [requestValid] = useState<string | null>(null);

  useEffect(() => {
    if (data?.art) {
      setIsContribution(true);
    }
  }, [data]);

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
        <div className="mt-4 ">
          <ReturnButton
            url="/contribution"
            state={{ user, isOwnProfil, filter, search }}
          />
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

      <Box sx={{ pt: 3 }}>
        <AnimateAlert requestError={requestError} requestValid={requestValid} />
      </Box>
    </Container>
  );
}

export default UserDetailsContribution;
