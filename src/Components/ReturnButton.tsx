import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type Props = {
  url: string;
  // eslint-disable-next-line react/require-default-props
  state?: any;
};

function ReturnButton({ url, state }: Props) {
  const { t } = useTranslation();

  return (
    <Link to={url} state={state} className="inline-flex">
      <ArrowBack />
      <p className="text-xl ml-3">{t("return")}</p>
    </Link>
  );
}

export default ReturnButton;
