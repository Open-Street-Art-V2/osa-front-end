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

export const getFavoriteArt = async (
  token: string | undefined,
  idArt: string
): Promise<boolean> => {
  const url = `${process.env.REACT_APP_API}/favorites/art/${idArt}`;
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

export const addFavoriteArt = async (
  token: string | undefined,
  idArt: string
) => {
  const url = `${process.env.REACT_APP_API}/favorites/art/${idArt}`;
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

export const deleteFavoriteArt = async (
  token: string | undefined,
  idArt: string
) => {
  const url = `${process.env.REACT_APP_API}/favorites/art/${idArt}`;
  const authorization = `Bearer ${token}`;

  try {
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
