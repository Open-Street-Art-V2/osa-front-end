import React from "react";
import AdminDetailsProposition from "../../../Components/AdminDetailsProposition";
import {
  acceptPropositions,
  refusePropositions,
} from "../../../services/propositions.service";

function DetailsProposition() {
  const data = {
    id: 5,
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
  };

  return (
    <AdminDetailsProposition
      data={data}
      accept={acceptPropositions}
      refuse={refusePropositions}
    />
  );
}

export default DetailsProposition;
