import { useContext, useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { StarBorder } from "@mui/icons-material";
import { LoginContext } from "./Context/LoginCtxProvider";
import {
  addFavoriteArt,
  deleteFavoriteArt,
  getFavoriteArt,
} from "../services/favorite.service";

type Props = {
  artId: string;
};

function FavoriteStar(props: Props) {
  const loginCtx = useContext(LoginContext);
  const [favorite, setFavorite] = useState<boolean>(false);
  const { artId } = props;

  useEffect(() => {
    getFavoriteArt(loginCtx.user?.jwt, artId).then((res: boolean) =>
      setFavorite(res)
    );
  }, [artId]);

  const handleClickFavorite = () => {
    const newFavorite = !favorite;

    if (newFavorite) {
      addFavoriteArt(loginCtx.user?.jwt, artId).then(() => {
        setFavorite(newFavorite);
      });
    } else {
      deleteFavoriteArt(loginCtx.user?.jwt, artId).then(() => {
        setFavorite(newFavorite);
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
