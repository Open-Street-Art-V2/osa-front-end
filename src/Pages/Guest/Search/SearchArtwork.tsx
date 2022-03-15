import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArtworkSearchCard, Header } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";

const data = [
  {
    id: 5,
    title: "Statut de la liberté",
    artist: "Bender",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a magna pretium, elementum odio ac, congue risus. Vivamus ut blandit nulla.",
    latitude: "1.07954",
    longitude: "49.43117",
    address: "12 rue Victor Hugo",
    city: "Rouen",
    created_at: "2022-02-21T16:57:39.835Z",
    pictures: [
      {
        position: 1,
        url: "artwork0.jpeg",
        created_at: "2022-02-21T16:57:39.875Z",
      },
      {
        position: 2,
        url: "artwork3.jpeg",
        created_at: "2022-02-21T16:57:39.875Z",
      },
    ],
    user: {
      id: 1,
      email: "test@test.com",
      password: "$2b$10$qtho84pdul8pTO2h3HoEteSRaN3Qoxn2bzwEvS6mRxGDRhCHGLWPe",
      name: "Munoz",
      firstname: "Georges",
      favoriteCity: null,
      birthDate: "1975-08-19",
      role: "ROLE_USER",
      created_at: "2022-02-05T11:34:20.488Z",
      arts: [],
    },
    art: null,
  },
  {
    id: 6,
    title: "Art1",
    artist: "Bender",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a magna pretium, elementum odio ac, congue risus. Vivamus ut blandit nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a magna pretium, elementum odio ac, congue risus. Vivamus ut blandit nulla.",
    latitude: "1.07954",
    longitude: "49.43117",
    address: "13 rue Victor Hugo",
    city: "Rouen",
    created_at: "2022-02-21T16:57:39.835Z",
    pictures: [
      {
        position: 1,
        url: "artwork2.jpeg",
        created_at: "2022-02-21T16:57:39.875Z",
      },
      {
        position: 2,
        url: "artwork3.jpeg",
        created_at: "2022-02-21T16:57:39.875Z",
      },
    ],
    user: {
      id: 1,
      email: "test@test.com",
      password: "$2b$10$qtho84pdul8pTO2h3HoEteSRaN3Qoxn2bzwEvS6mRxGDRhCHGLWPe",
      name: "Munoz",
      firstname: "Georges",
      favoriteCity: null,
      birthDate: "1975-08-19",
      role: "ROLE_USER",
      created_at: "2022-02-05T11:34:20.488Z",
      arts: [],
    },
    art: null,
  },
];

function SearchArtwork() {
  const loginCtx = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("title");
  // const [data, setData] = useState<Art[] | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    console.log(search, filter);
    if (search !== "") {
      // API call here
      // searchArt(search, filter).then((res) => {
      //   console.log(res);
      //   setData(res);
      // });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute right-0 pt-2 mx-3 w-2/5">
        <select
          className="form-select appearance-none block w-full py-1.5 pl-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={handleSelectChange}
        >
          <option value="title">Par titre</option>
          <option value="city">Par ville</option>
          <option value="artist">Par artiste</option>
        </select>
      </div>

      <div className="relative z-10 mt-12 mx-3">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-input"
          className="block p-2 px-10 w-full text-gray-900 bg-gray-50 rounded-xl border border-gray-300 sm:text-sm focus:ring-gray-500 focus:border-gray-50"
          placeholder="Recherche d'oeuvres"
          onChange={handleChange}
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-500">
          <button type="button" id="search-button" onClick={handleClick}>
            OK
          </button>
        </div>
      </div>

      <div className="mx-3 -mt-2 pt-3 pb-3 mb-20 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
        {isLoading &&
          [1, 2, 3, 4].map((item: any) => {
            return (
              <div
                key={item}
                className="animate-pulse grid grid-cols-6 gap-1 mt-3 mx-2 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
              >
                <div className="flex flex-row col-span-5">
                  <div className="w-36 h-24 bg-slate-200 rounded-3xl" />
                  <div className="overflow-hidden pl-3">
                    <div className="flex flex-row justify-between mt-3 mb-2">
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                      <div className="h-2 w-12 bg-slate-200 rounded pt-1" />
                    </div>
                    <div className="mt-6">
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {data &&
          data.map((art: any) => {
            return (
              <div key={art.id} className="mt-3 mx-2">
                <Link
                  to="/details-artwork"
                  state={{ data: art }}
                  className="w-fit"
                >
                  <ArtworkSearchCard data={art} />
                </Link>
              </div>
            );
          })}

        {!isLoading && !data && (
          <div className="pt-1 text-center">Aucun résultat</div>
        )}
      </div>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default SearchArtwork;
