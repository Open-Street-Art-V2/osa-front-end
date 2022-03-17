import { Art } from "../types/art";

const searchArt = async (search: string, filter: string): Promise<Art[]> => {
  const url = `${process.env.REACT_APP_API}/art/${filter}/${search}`;

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
