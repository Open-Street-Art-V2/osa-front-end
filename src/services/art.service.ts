import { Art } from "../types/art";

export const searchArt = async (
  search: string,
  filter: string,
  currentPage: number,
  // eslint-disable-next-line no-unused-vars
  setHasMore: (hasMore: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setArts: (art: any) => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (page: number) => void
) => {
  setIsLoading(true);
  const urlFilter = filter === "nofilter" ? "search" : filter;
  const url = `${process.env.REACT_APP_API}/art/${urlFilter}/${search}?page=${currentPage}&limit=10`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    await response.json().then((res) => {
      setArts((old: Art[] | null) =>
        old === null ? res.items : [...old, ...res.items]
      );
      if (res.meta.totalPages === res.meta.currentPage) {
        setHasMore(false);
      }
    });
  } catch (error) {
    throw new Error();
  } finally {
    setIsLoading(false);
    setCurrentPage(currentPage + 1);
  }
};

export const getArt = async (artId: string | undefined) => {
  const url = `${process.env.REACT_APP_API}/art/${artId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    throw new Error();
  }
};
