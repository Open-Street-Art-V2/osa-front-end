export const searchUser = async (
  search: string,
  currentPage: number,
  role: string | undefined,
  token: string | undefined,
  // eslint-disable-next-line no-unused-vars
  setHasMore: (hasMore: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setUsers: (user: any) => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (isLoading: boolean) => void,
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (page: number) => void
) => {
  setIsLoading(true);
  let url;
  if (role === "ROLE_ADMIN")
    url = `${process.env.REACT_APP_API}/users/admin-search?page=${currentPage}&limit=10`;
  else {
    url = `${process.env.REACT_APP_API}/users/search?page=${currentPage}&limit=10`;
  }

  const body = { fullname: search };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    await response.json().then((res) => {
      setUsers((old: any | null) =>
        old === null ? res.results : [...old, ...res.results]
      );
      if (res.results === 0) {
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

export const getUserProfile = async (token: string | undefined) => {
  const url = `${process.env.REACT_APP_API}/users/profile`;

  try {
    const res: Response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
