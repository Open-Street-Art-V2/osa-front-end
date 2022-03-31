/* eslint-disable no-unused-vars */
export const blockUser = async (
  id: number,
  token: string | undefined,
  setUserAB: (user: any) => void
) => {
  const url = `${process.env.REACT_APP_API}/users/block/${id}`;
  try {
    await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUserAB((prevState: any) => ({ ...prevState, banned: 1 }));
    });
  } catch (error) {
    throw new Error();
  }
};

export const unblockUser = async (
  id: number,
  token: string | undefined,
  setUserAB: (user: any) => void
) => {
  const url = `${process.env.REACT_APP_API}/users/unblock/${id}`;
  try {
    return await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUserAB((prevState: any) => ({ ...prevState, banned: 0 }));
    });
  } catch (error) {
    throw new Error();
  }
};

export const changeUserRole = async (
  id: number,
  token: string | undefined,
  setUserAB: (user: any) => void
) => {
  const url = `${process.env.REACT_APP_API}/users/role/${id}`;
  try {
    return await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUserAB((prevState: any) => ({ ...prevState, admin: true }));
    });
  } catch (error) {
    throw new Error();
  }
};
