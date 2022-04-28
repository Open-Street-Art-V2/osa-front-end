import { Backdrop } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import getPDF from "../services/media.service";
import { Art } from "../types/art";
import { StyledModal } from "./utils/types";

type Props = {
  arts: Art[] | null;
  city: string;
};

function ExportMedia(props: Props) {
  const { t } = useTranslation();
  const { arts, city } = props;

  const headers = [
    { label: t("id"), key: "id" },
    { label: t("Title"), key: "title" },
    { label: t("artist"), key: "artist" },
    { label: t("description"), key: "description" },
    { label: t("longitude"), key: "longitude" },
    { label: t("latitude"), key: "latitude" },
    { label: t("address"), key: "address" },
  ];

  const [csvModal, setCsvModal] = useState(false);
  const [csv, setCsv] = useState([
    {
      id: "",
      title: "",
      artist: "",
      description: "",
      latitude: 0,
      longitude: 0,
      address: "",
    },
  ]);

  useEffect(() => {
    const tab: any = [];
    // eslint-disable-next-line array-callback-return
    arts?.map((art: Art) => {
      tab.push({
        id: art.id,
        title: art.title,
        artist: art.artist,
        description: art.description,
        latitude: art.latitude,
        longitude: art.longitude,
        address: art.address,
      });
    });
    setCsv(tab);
  }, [arts]);

  const savePDF = () => {
    return getPDF(city)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `OpenStreetArt-${city}-cities.pdf`;
        link.click();
      });
  };

  return (
    <>
      {arts && arts?.length !== 0 && (
        <div className="flex flex-row justify-around pt-3">
          <button
            type="button"
            className="h-10 px-5 bg-logoGreen text-white dark:font-bold transition-colors duration-150 focus:shadow-outline rounded-3xl"
            onClick={() => setCsvModal(true)}
            data-modal-toggle="defaultModal"
          >
            {t("export")}
          </button>
        </div>
      )}

      <StyledModal
        open={csvModal}
        onClose={() => {
          setCsvModal(false);
        }}
        BackdropComponent={Backdrop}
        className="backdrop-blur-sm"
      >
        <Box className="w-screen">
          <div className="w-80 mx-auto bg-white dark:bg-black rounded-3xl shadow-2xl relative flex flex-col w-full p-4 outline-none focus:outline-none">
            <button
              type="button"
              className="bg-slate-100 text-white place-self-center rounded-full p-2 ml-auto"
              // eslint-disable-next-line react/destructuring-assignment
              onClick={() => {
                setCsvModal(false);
              }}
            >
              <GrClose />
            </button>

            <p className="pb-2 text-xl font-semibold text-slate-900 dark:text-white text-center">
              {t("export")}
            </p>
            <div className="flex flex-col pl-4 mb-6 mt-3 mx-3 justify-between">
              <p className="text-md font-medium text-slate-500">
                {t("export.text")}
              </p>
            </div>

            <div className="flex flex-row justify-around">
              <CSVLink
                data={csv}
                headers={headers}
                filename={`OpenStreetArt-${city}-cities.csv`}
                className="flex items-center h-10 px-5 bg-logoGreen text-white dark:font-bold transition-colors duration-150 focus:shadow-outline rounded-3xl"
                onClick={() => {
                  setCsvModal(false);
                }}
              >
                {t("export.csv")}
              </CSVLink>
              <button
                type="button"
                onClick={savePDF}
                className="flex items-center h-10 px-5 bg-logoGreen text-white dark:font-bold transition-colors duration-150 focus:shadow-outline rounded-3xl"
              >
                {t("export.pdf")}
              </button>
            </div>
          </div>
        </Box>
      </StyledModal>
    </>
  );
}

export default ExportMedia;
