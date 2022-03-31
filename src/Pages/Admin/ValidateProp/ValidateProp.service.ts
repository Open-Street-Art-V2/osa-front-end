/* eslint-disable no-unused-vars */
export const getProposals = async (
  isContributions: boolean,
  currentPage: number,
  token: string | undefined,
  setHasMoreProp: (hasMoreProp: boolean) => void,
  setAllArtwork: (allArtwork: any) => void,
  setCheckedProposals: (checkedProposals: any) => void,
  setCurrentPage: (currentPage2: number) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  let url = "";
  if (!isContributions) {
    url = `${process.env.REACT_APP_GET_PROPOSALS}?page=${currentPage}&limit=10`;
  } else {
    url = `${process.env.REACT_APP_GET_CONTRIBUTION}?page=${currentPage}&limit=10`;
  }
  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const res2 = await res.json();
  if (res.ok) {
    const data = res2.items;
    if (data.length < 1) {
      setHasMoreProp(false);
    }
    setAllArtwork((old: any) => [...old, ...data]);
    const proposals = new Array(data.length).fill(null).map(() => ({
      checked: false,
      id: 0,
    }));

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      proposals[i].id = data[i].id.toString();
    }
    setCheckedProposals((old: any) => [...old, ...proposals]);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setIsLoading(false);
  }
};

export const validateProposals = async (
  isContributions: boolean,
  token: string | undefined,
  proposals: any,
  setUpdateComp: (updateComp: boolean) => void
) => {
  let url = "";
  if (!isContributions) {
    url = `${process.env.REACT_APP_VALIDATE_PROPOSALS}`;
  } else {
    url = `${process.env.REACT_APP_VALIDATE_CONTRIBUTION}`;
  }
  const bodyPost = JSON.stringify({ propositions: proposals });
  if (url) {
    const res: Response = await fetch(url, {
      method: "POST",
      body: bodyPost,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setUpdateComp(true);
    }
  }
};

export const rejectProposals = async (
  isContributions: boolean,
  token: string | undefined,
  proposals: any,
  setUpdateComp: (updateComp: boolean) => void
) => {
  let url = "";
  if (!isContributions) {
    url = `${process.env.REACT_APP_GET_PROPOSALS}`;
  } else {
    url = `${process.env.REACT_APP_GET_CONTRIBUTION}`;
  }

  const bodyPost = JSON.stringify({ propositions: proposals });
  const res: Response = await fetch(url, {
    method: "DELETE",
    body: bodyPost,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    setUpdateComp(true);
  }
  return res;
};

export const getContributions = async (
  currentPage: number,
  token: string | undefined,
  id: number | undefined,
  setHasMoreProp: (hasMoreProp: boolean) => void,
  setAllArtwork: (allArtwork: any) => void,
  setCurrentPage: (currentPage2: number) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  const url = `${process.env.REACT_APP_API}/contribution/user/${id}?page=${currentPage}&limit=10`;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const res2 = await res.json();
  if (res.ok) {
    const data = res2.items;
    if (data.length < 1) {
      setHasMoreProp(false);
    }
    setAllArtwork((old: any) => [...old, ...data]);
    const proposals = new Array(data.length).fill(null).map(() => ({
      checked: false,
      id: 0,
    }));

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      proposals[i].id = data[i].id.toString();
    }
    // setCheckedProposals((old: any) => [...old, ...proposals]);
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setIsLoading(false);
  }
};
