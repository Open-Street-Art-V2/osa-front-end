import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

type Props =
  | { goBack?: false; url: string; state?: any }
  | { goBack: true; url?: never; state?: never };

function ReturnButton({ goBack, url, state }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (goBack) {
    return (
      <button
        type="button"
        className="inline-flex"
        onClick={() => navigate(-1)}
      >
        <ArrowBack />
        <p className="text-xl ml-3">{t("return")}</p>
      </button>
    );
  }

  return (
    <Link
      to={url}
      state={state}
      className="flex items-center dark:text-slate-200"
    >
      <ArrowBack />
      <p className="text-xl ml-3">{t("return")}</p>
    </Link>
  );
}

export default ReturnButton;
