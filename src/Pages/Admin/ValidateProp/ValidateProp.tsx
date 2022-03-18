import React, { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header, ArtworkProposal } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import {
  validateProposals,
  rejectProposals,
  getProposals,
} from "./ValidateProp.service";
import NavBar from "../../../Components/NavBar";

function ValidateProp() {
  const { t } = useTranslation();
  const [allArtwork, setAllArtwork] = useState<any[]>([]);
  const [checkedProposals, setCheckedProposals] = useState([] as any);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isContributions, setIsContributions] = useState(false);
  const [updateComp, setUpdateComp] = useState(false);
  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);
  const skeletons = [1, 2, 3, 4];

  useEffect(() => {
    if (loginCtx.user?.role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [loginCtx]);

  const handleAllProposalsChange = () => {
    const updatedCheckedState = checkedProposals.map((item: any) => ({
      checked: !isAllChecked,
      id: item.id,
    }));
    setCheckedProposals(updatedCheckedState);
    setIsAllChecked(!isAllChecked);
  };

  const handleProposalChange = (position: number) => {
    const updatedCheckedState = checkedProposals.map(
      (item: any, index: number) =>
        index === position ? { checked: !item.checked, id: item.id } : item
    );
    setCheckedProposals(updatedCheckedState);
  };

  const handleValidateProposals = () => {
    const prop = checkedProposals.filter((item: any) => item.checked);
    if (prop.length > 0) {
      const newArray = prop.map((item: any) => {
        // eslint-disable-next-line no-param-reassign
        delete item.checked;
        return item;
      });
      const proposals = new Array(newArray.length).fill(null);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newArray.length; i++) {
        proposals[i] = Number(newArray[i].id);
      }
      validateProposals(
        isContributions,
        loginCtx.user?.jwt,
        proposals,
        setUpdateComp
      );
    }
  };

  const handleRejectProposals = () => {
    const prop = checkedProposals.filter((item: any) => item.checked);
    if (prop.length > 0) {
      const newArray = prop.map((item: any) => {
        // eslint-disable-next-line no-param-reassign
        delete item.checked;
        return item;
      });
      const proposals = new Array(newArray.length).fill(null);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newArray.length; i++) {
        proposals[i] = Number(newArray[i].id);
      }
      rejectProposals(
        isContributions,
        loginCtx.user?.jwt,
        proposals,
        setUpdateComp
      );
    }
  };

  function handleSwitchChange() {
    setUpdateComp(true);
    setIsContributions(!isContributions);
  }

  useEffect(() => {
    if (updateComp) {
      setAllArtwork([]);
      setCheckedProposals([]);
      setIsAllChecked(false);
      // setHasMoreProp(false);
      setIsLoading(true);
      setCurrentPage(1);
      setUpdateComp(false);
    }
  }, [updateComp]);

  useEffect(() => {
    if (currentPage === 1) {
      getProposals(
        isContributions,
        currentPage,
        loginCtx.user?.jwt,
        setHasMoreProp,
        setAllArtwork,
        setCheckedProposals,
        setCurrentPage,
        setIsLoading
      );
    }
  }, [currentPage]);

  return (
    <div className="container">
      <div className="">
        <Header />
        <div className="flex flex-row justify-around p-5">
          <button
            type="button"
            className="w-28 h-10 bg-green-500 text-white rounded-3xl"
            onClick={() => {
              handleValidateProposals();
            }}
          >
            {t("valider")}
          </button>
          <button
            type="button"
            className="w-28 h-10 bg-red-500 text-white rounded-3xl"
            onClick={() => {
              handleRejectProposals();
            }}
          >
            {t("refuse")}
          </button>
        </div>
        <div className="flex justify-center mb-5">
          <p className="form-check-label inline-block text-gray-800 p-2">
            {t("display")}
          </p>
          {isContributions && (
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={handleSwitchChange}
              className="inline-block bg-slate-100 text-slate-600 font-medium text-md rounded-3xl shadow-md p-2"
            >
              {t("proposals.lower")}
            </button>
          )}
          {!isContributions && (
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              onClick={handleSwitchChange}
              className="inline-block bg-slate-100 text-slate-600 font-medium text-md rounded-3xl shadow-md p-2"
            >
              {t("contributions.lower")}
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4 content-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl">
          <input
            className="justify-self-center w-7 h-7 shadow-md form-check-input appearance-none border border-slate-500 rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain float-left cursor-pointer"
            type="checkbox"
            name="allPropsCheck"
            value=""
            checked={isAllChecked}
            onChange={handleAllProposalsChange}
            id="flexCheckDefault"
          />
          {isContributions && (
            <p className="content-center text-2xl font-medium col-span-2">
              {t("contributions.upper")}
            </p>
          )}
          {!isContributions && (
            <p className="content-center text-2xl font-medium col-span-2">
              {t("proposals.upper")}
            </p>
          )}
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="overflow-auto h-[calc(100vh-364px)] py-2"
      >
        {isLoading &&
          skeletons.map((item: any) => {
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
        <InfiniteScroll
          dataLength={allArtwork.length}
          next={() => {
            getProposals(
              isContributions,
              currentPage,
              loginCtx.user?.jwt,
              setHasMoreProp,
              setAllArtwork,
              setCheckedProposals,
              setCurrentPage,
              setIsLoading
            );
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
          scrollableTarget="scrollableDiv"
        >
          {!isLoading &&
            allArtwork.length > 0 &&
            allArtwork.length === checkedProposals.length &&
            allArtwork.map((Artwork: any, index: number) => {
              return (
                <div
                  key={Artwork.id}
                  className="flex content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
                >
                  <input
                    className="flex-none m-5 justify-self-center self-center shadow-md border border-slate-700 w-7 h-7 content-center form-check-input appearance-none rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain cursor-pointer"
                    type="checkbox"
                    value={checkedProposals[index].checked}
                    checked={checkedProposals[index].checked}
                    onChange={() => handleProposalChange(index)}
                    id="flexCheckDefault"
                  />

                  {isContributions ? (
                    <Link
                      to="/admin/details-contribution"
                      state={{ data: Artwork }}
                      className="grow mx-1"
                    >
                      <ArtworkProposal data={Artwork} />
                    </Link>
                  ) : (
                    <Link
                      to="/admin/details-proposition"
                      state={{ data: Artwork }}
                      className="grow mx-1"
                    >
                      <ArtworkProposal data={Artwork} />
                    </Link>
                  )}
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
      <NavBar />
    </div>
  );
}
export default ValidateProp;
