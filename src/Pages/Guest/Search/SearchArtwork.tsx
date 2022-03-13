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
];

function SearchArtwork() {
  const loginCtx = useContext(LoginContext);
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    console.log(search);
    if (search !== "") {
      // API call here
    }
  };

  return (
    <div className="container">
      <Header />

      <div className="relative z-10 mt-4 mx-3">
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
          id="table-search"
          className="block p-2 px-10 w-full text-gray-900 bg-gray-50 rounded-xl border border-gray-300 sm:text-sm focus:ring-gray-500 focus:border-gray-50"
          placeholder="Recherche d'oeuvres"
          onChange={handleChange}
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-500">
          <button type="button" onClick={handleClick}>
            OK
          </button>
        </div>
      </div>

      <div className="mx-3 -mt-2 pt-3 pb-3 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
        {data.map((art: any) => {
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
      </div>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default SearchArtwork;
