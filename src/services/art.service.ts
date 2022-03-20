const searchArt = async (
  search: string,
  filter: string,
  currentPage: number
) => {
  const url = `${process.env.REACT_APP_API}/art/${filter}/${search}?page=${currentPage}&limit=10`;

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

export default searchArt;
