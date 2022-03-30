export const blockUser = async (id: number, token: string | undefined) => {
  const url = `${process.env.REACT_APP_API}/users/block/${id}`;
  try {
    return await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

export const unblockUser = async (id: number, token: string | undefined) => {
  const url = `${process.env.REACT_APP_API}/users/unblock/${id}`;
  try {
    return await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

export const changeUserRole = async (id: number, token: string | undefined) => {
  const url = `${process.env.REACT_APP_API}/users/role/${id}`;
  try {
    return await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error();
  }
};
