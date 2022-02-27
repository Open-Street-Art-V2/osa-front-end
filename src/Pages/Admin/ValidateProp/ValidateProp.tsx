/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, Link } from "react-router-dom";
import { Header, ArtworkProposal } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import "./ValidateProp.css";

function ValidateProp() {
  const [allArtwork, setAllArtwork] = useState<any[]>([]);
  const [checkedProposals, setCheckedProposals] = useState([] as any);
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);

  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (loginCtx.user?.role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [loginCtx]);

  async function getArtwork() {
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
        const index = 0;
        setAllArtwork(data);
        const proposals = new Array(data.length).fill(null).map(() => ({
          checked: false,
          id: 0,
        }));

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < data.length; i++) {
          proposals[i].id = data[i].id;
          // console.log(data[i].id);
        }
        console.log(proposals);

        setCheckedProposals(proposals);
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
      }
    }
  }
  useEffect(() => {
    console.log("hi");
    getArtwork();
  }, []);

  const handleAllProposalsChange = () => {
    // console.log(isChecked);
    setIsChecked(!isChecked);
  };

  // Change Proposal state (true : if checked, flase : if not)
  const handleProposalChange = (position: number) => {
    const updatedCheckedState = checkedProposals.map(
      (item: any, index: number) =>
        index === position ? { checked: !item.checked, id: item.id } : item
    );
    setCheckedProposals(updatedCheckedState);
  };

  const handleValidateProposals = () => {
    console.log(checkedProposals.filter((item: any) => item.checked));
  };

  async function sendValidatedProposals() {
    const url = process.env.REACT_APP_VALIDATE_PROPOSALS;
    if (url) {
      /* const res: Response = await fetch(url);
      const data = await res.json();
      if (data.ok) {
        console.log("done");
      } */
    }
  }

  async function fetchMoreData() {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
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
          proposals[i].id = data[i].id;
          // console.log(data[i].id);
        }
        console.log(proposals);
        setCheckedProposals((old: any) => [...old, ...proposals]);
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        /* for (let i = 0; i < data.length; i = +1) {
        proposals[i].id = data[i].id;
      }
      console.log(proposals); */
      }
    }
    /* setTimeout(() => {
      setAllArtwork({
        items: allArtwork.concat(Array.from({ length: 20 })),
      });
    }, 1500); */
  }
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
          >
            Refuser
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 content-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl">
          <input
            className="justify-self-center w-7 h-7 shadow-md form-check-input appearance-none border border-slate-700 rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
            type="checkbox"
            name="allPropsCheck"
            value=""
            checked={isChecked}
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
            console.log("hola");
            fetchMoreData();
          }}
          hasMore={hasMoreProp}
          loader={<h4>Loading...</h4>}
          endMessage={<h1>Yay! You have seen it all</h1>}
          scrollableTarget="scrollableDiv"
        >
          {allArtwork &&
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
