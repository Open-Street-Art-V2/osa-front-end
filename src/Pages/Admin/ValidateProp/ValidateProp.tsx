/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Alert } from "@mui/material";
import { Header, ArtworkProposal } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import "./ValidateProp.css";

function ValidateProp() {
  const [allArtwork, setAllArtwork] = useState<any[]>([]);
  const [checkedProposals, setCheckedProposals] = useState([] as any);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isContributions, setIsContributions] = useState(false);

  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (loginCtx.user?.role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [loginCtx]);

  const handleAllProposalsChange = () => {
    // console.log(isAllChecked);
    const updatedCheckedState = checkedProposals.map((item: any) => ({
      checked: !isAllChecked,
      id: item.id,
    }));
    setCheckedProposals(updatedCheckedState);
    setIsAllChecked(!isAllChecked);
  };

  // Change Proposal state (true : if checked, flase : if not)
  const handleProposalChange = (position: number) => {
    const updatedCheckedState = checkedProposals.map(
      (item: any, index: number) =>
        index === position ? { checked: !item.checked, id: item.id } : item
    );
    setCheckedProposals(updatedCheckedState);
  };

  async function sendValidatedProposals(prop: any) {
    let url = "";
    if (!isContributions) {
      url = "http://localhost:3008/proposition/validate";
    } else {
      url = "http://localhost:3008/contribution/validMany";
    }
    // const formData = new FormData();
    const proposals = new Array(prop.length).fill(null);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < prop.length; i++) {
      // formData.append("propositions", prop[i].id);
      proposals[i] = Number(prop[i].id);
      // console.log(prop[i].id);
    }
    console.log(proposals);
    const bodyPost = JSON.stringify({ propositions: proposals });
    console.log(bodyPost);
    if (url) {
      const res: Response = await fetch(url, {
        method: "POST",
        body: bodyPost,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      if (res.ok) {
        console.log("done");
        /* const newAllArtwork = allArtwork.filter((item: any) => item.id !== "8");
        console.log(newAllArtwork);
        setCheckedProposals([]);
        React.useCallback(() => setAllArtwork(newAllArtwork), []); */
        window.location.reload();
      }
    }
  }

  const handleValidateProposals = () => {
    const prop = checkedProposals.filter((item: any) => item.checked);

    const newArray = prop.map(function (item: any) {
      // eslint-disable-next-line no-param-reassign
      delete item.checked;
      return item;
    });
    console.log(prop);
    console.log(newArray);
    sendValidatedProposals(newArray);
  };

  async function sendDeleteProposals(prop: any) {
    let url = "";
    if (!isContributions) {
      url = "http://localhost:3008/proposition";
    } else {
      url = "http://localhost:3008/contribution";
    }
    // const formData = new FormData();
    const proposals = new Array(prop.length).fill(null);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < prop.length; i++) {
      // formData.append("propositions", prop[i].id);
      proposals[i] = Number(prop[i].id);
      // console.log(prop[i].id);
    }
    console.log(proposals);
    const bodyPost = JSON.stringify({ propositions: proposals });
    console.log(bodyPost);
    if (url) {
      const res: Response = await fetch(url, {
        method: "DELETE",
        body: bodyPost,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      if (res.ok) {
        console.log("DELETE : done");
        /* const newAllArtwork = allArtwork.filter((item: any) => item.id !== "8");
        console.log(newAllArtwork);
        setCheckedProposals([]);
        React.useCallback(() => setAllArtwork(newAllArtwork), []); */
        // window.location.reload();
      }
    }
  }

  const handleDeleteProposals = () => {
    const prop = checkedProposals.filter((item: any) => item.checked);

    const newArray = prop.map(function (item: any) {
      // eslint-disable-next-line no-param-reassign
      delete item.checked;
      return item;
    });
    sendDeleteProposals(newArray);
  };

  async function fetchMoreData() {
    const url = `${process.env.REACT_APP_GET_PROPOSALS}?page=${currentPage}&limit=10`;
    if (url) {
      const res: Response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      const res2 = await res.json();
      if (res.ok) {
        const data = res2.items;
        // console.log(data);
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
        console.log(nextPage);
        setCurrentPage(nextPage);
        setIsLoading(false);
      }
    }
  }
  const skeletons = [1, 2, 3, 4];

  useEffect(() => {
    // setIsLoading(true);
    // fetchMoreData();
  }, []);

  async function fetchMoreDataContrib() {
    console.log("hi");
    const url = `${process.env.REACT_APP_VALIDATE_CONTRIBUTION}?page=${currentPage}&limit=10`;
    if (url) {
      const res: Response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${loginCtx.user?.jwt}`,
        },
      });
      const res2 = await res.json();
      if (res.ok) {
        const data = res2.items;
        // console.log(data);
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
        console.log(nextPage);
        setCurrentPage(nextPage);
        setIsLoading(false);
      }
    }
  }

  function handleSwitchChange() {
    console.log("switch change");
    setCheckedProposals([]);
    setIsAllChecked(false);
    setHasMoreProp(true);
    setIsLoading(true);
    setAllArtwork([]);
    setCurrentPage(1);

    /* if (isContributions) {
      console.log("fetchMoreData");
      console.log(currentPage);
      fetchMoreData();
    } else {
      console.log("fetchMoreDataContrib");
      console.log(currentPage);
      fetchMoreDataContrib();
    } */
    setIsContributions(!isContributions);
  }

  useEffect(() => {
    if (currentPage === 1) {
      if (isContributions) {
        fetchMoreDataContrib();
      } else {
        fetchMoreData();
      }
    }
  }, [currentPage]);

  return (
    <div className="container">
      <div className="">
        <Header />
        <div className="flex flex-row justify-around px-10 p-5">
          <button
            type="button"
            className="w-28 h-10 bg-green-500 text-white rounded-3xl"
            onClick={() => {
              handleValidateProposals();
            }}
          >
            Accepter
          </button>
          <button
            type="button"
            className="w-28 h-10 bg-red-500 text-white rounded-3xl"
            onClick={() => {
              handleDeleteProposals();
            }}
          >
            Refuser
          </button>
        </div>
        <div className="flex justify-center mb-5">
          <div className="form-check form-switch">
            <input
              className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              onChange={handleSwitchChange}
              id="flexSwitchCheckDefault"
            />
            <p
              className="form-check-label inline-block text-gray-800"
              // htmlFor="flexSwitchCheckDefault"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 content-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl">
          <input
            className="justify-self-center w-7 h-7 shadow-md form-check-input appearance-none border border-slate-500 rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
            type="checkbox"
            name="allPropsCheck"
            value=""
            checked={isAllChecked}
            onChange={handleAllProposalsChange}
            id="flexCheckDefault"
          />
          <p id="propositions" className="content-center col-span-2">
            Propositions
          </p>
        </div>
      </div>
      <div id="scrollableDiv" className="overflow-auto h-[calc(100vh-224px)]">
        <InfiniteScroll
          dataLength={allArtwork.length}
          next={() => {
            if (!isContributions) {
              console.log("fetchMoreData");
              console.log(currentPage);
              fetchMoreData();
            } else {
              console.log("fetchMoreDataContrib");
              console.log(currentPage);
              fetchMoreDataContrib();
            }
          }}
          hasMore={hasMoreProp}
          loader={skeletons.map((item: any) => {
            return (
              <div
                key={item}
                className="animate-pulse grid grid-cols-6 gap-1 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
              >
                <div className="justify-self-center self-center shadow-md border border-slate-400 w-7 h-7 content-center bg-slate-200 rounded-sm" />

                <div className="flex flex-row col-span-5">
                  <div className="w-32 h-24 bg-slate-200 rounded-3xl" />
                  <div className="w-44 h-20 overflow-hidden pl-2">
                    <div className="flex flex-row justify-between mt-3 mb-2">
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                      <div className="h-2 w-12 bg-slate-200 rounded pt-1" />
                    </div>
                    <div className="mt-5">
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          endMessage={
            <AnimatePresence initial exitBeforeEnter>
              <motion.div
                variants={{
                  hidden: {
                    scale: 0.5,
                    y: "+30vh",
                    opacity: 0,
                  },
                  visible: {
                    y: "0",
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      damping: 25,
                      stiffness: 400,
                    },
                  },
                  exit: {
                    x: "-30vh",
                    opacity: 0,
                    scale: 0.5,
                    transition: {
                      duration: 0.3,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Alert severity="success">Yay! You have seen it all</Alert>
              </motion.div>
            </AnimatePresence>
          }
          scrollableTarget="scrollableDiv"
        >
          {!isLoading &&
            allArtwork.length > 0 &&
            allArtwork.length === checkedProposals.length &&
            allArtwork.map((Artwork: any, index: number) => {
              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={Artwork.id}
                  className="grid grid-cols-6 gap-1 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
                >
                  <input
                    className="justify-self-center self-center shadow-md border border-slate-700 w-7 h-7 content-center form-check-input appearance-none rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                    type="checkbox"
                    value=""
                    checked={checkedProposals[index].checked}
                    onChange={() => handleProposalChange(index)}
                    id="flexCheckDefault"
                  />
                  <ArtworkProposal data={Artwork} />
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ValidateProp;
