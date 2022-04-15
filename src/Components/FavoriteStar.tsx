import { useContext, useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { StarBorder } from "@mui/icons-material";
import { LoginContext } from "./Context/LoginCtxProvider";
import {
  addFavorite,
  deleteFavorite,
  getFavorite,
} from "../services/favorite.service";

type Props = {
  id: string | number;
  isArt: boolean;
};

function FavoriteStar(props: Props) {
  const loginCtx = useContext(LoginContext);
  const [favorite, setFavorite] = useState<boolean>(false);
  const { id, isArt } = props;

  useEffect(() => {
    getFavorite(isArt, loginCtx.user?.jwt, id).then((res: boolean) =>
      setFavorite(res)
    );
  }, [id]);

  const handleClickFavorite = () => {
    const newFavorite = !favorite;

    if (newFavorite) {
      addFavorite(isArt, loginCtx.user?.jwt, id).then((res) => {
        if (res.ok) {
          setFavorite(newFavorite);
        }
      });
    } else {
      deleteFavorite(isArt, loginCtx.user?.jwt, id).then((res) => {
        if (res.ok) {
          setFavorite(newFavorite);
        }
      });
    }
  };

  return (
    <button type="button" onClick={() => handleClickFavorite()}>
      {favorite ? (
        <StarIcon sx={{ color: "#fbbf24", width: "30px", height: "30px" }} />
      ) : (
        <StarBorder sx={{ color: "#fbbf24", width: "30px", height: "30px" }} />
      )}
    </button>
  );
}

export default FavoriteStar;
