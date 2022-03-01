// TODO: à remplacer par les bons appels API
export const acceptContributions = (
  contributions: number[],
  token: string | undefined
) => {
  const url = `http://localhost:3008/contribution/validate`;
  const body = { contributions };
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
  const url = `http://localhost:3008/contribution/${contributionId}`;
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
