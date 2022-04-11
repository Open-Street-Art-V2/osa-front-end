export const getFavoriteArts = async (
  idUser: number | undefined,
  currentPage: number,
  token: string | undefined,
  // eslint-disable-next-line no-unused-vars
  setHasMore: (hasMore: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setArts: (art: any) => void,
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (page: number) => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void
) => {
  const url = `${process.env.REACT_APP_API}/favorites/art?id=${idUser}&page=${currentPage}&limit=10`;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.ok) {
    if (data.length < 1) {
      setHasMore(false);
    }
    const arts = data.map((o: any) => {
      return o.art;
    });
    setArts((old: any) => [...old, ...arts]);
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  }
};

export const getFavoriteArtists = async (
  idUser: number | undefined,
  currentPage: number,
  token: string | undefined,
  // eslint-disable-next-line no-unused-vars
  setHasMore: (hasMore: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setArtists: (art: any) => void,
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (page: number) => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void
) => {
  const url = `${process.env.REACT_APP_API}/favorites/artist?id=${idUser}&page=${currentPage}&limit=10`;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.ok) {
    if (data.length < 1) {
      setHasMore(false);
    }
    const artists = data.map((o: any) => {
      return o.artist;
    });
    setArtists((old: any) => [...old, ...artists]);
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  }
};

export const getFavorite = async (
  isArt: boolean,
  token: string | undefined,
  id: string | number
): Promise<boolean> => {
  const target = isArt ? "art" : "artist";
  const url = `${process.env.REACT_APP_API}/favorites/${target}/${id}`;
  const authorization = `Bearer ${token}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization,
      },
    });

    let result = false;
    await response.json().then((res) => {
      result = res.exist;
    });
    return result;
  } catch (error) {
    throw new Error();
  }
};

export const addFavorite = async (
  isArt: boolean,
  token: string | undefined,
  id: string | number
) => {
  const target = isArt ? "art" : "artist";
  const url = `${process.env.REACT_APP_API}/favorites/${target}/${id}`;
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

export const deleteFavorite = async (
  isArt: boolean,
  token: string | undefined,
  id: string | number
) => {
  const target = isArt ? "art" : "artist";
  const url = `${process.env.REACT_APP_API}/favorites/${target}/${id}`;
  const authorization = `Bearer ${token}`;

  try {
    // TODO: vérifier code retour
    return fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};
