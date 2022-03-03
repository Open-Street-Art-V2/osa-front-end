export const acceptContributions = (
  contributions: number[],
  token: string | undefined
) => {
  const url = `${process.env.REACT_APP_API}/contribution/validMany`;
  const body = { propositions: contributions };
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

export const refuseContributions = (
  contributionId: number,
  token: string | undefined
) => {
  const url = `${process.env.REACT_APP_API}/contribution/${contributionId}`;
  const authorization = `Bearer ${token}`;

  try {
    return fetch(url, {
      method: "DELETE",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    throw new Error();
  }
};
