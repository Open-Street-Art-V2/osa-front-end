const getPDF = async (city: string) => {
  const url = `${process.env.REACT_APP_API}/media/pdf/${city}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/pdf",
    },
  });
};

export default getPDF;
