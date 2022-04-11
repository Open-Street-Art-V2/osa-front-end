import MapAdmin from "../Pages/Admin/Map/map";
import SignIn from "../Pages/Guest/SignIn/SignIn";
import SignUp from "../Pages/Guest/SignUp/SignUp";
import MapUser from "../Pages/User/Map/map";
import FormAdmin from "../Pages/Admin/Form/createForm";
import ModifyArtAdmin from "../Pages/Admin/FormMod/ModifyArtwork";
import ProposeArtUser from "../Pages/User/Forms/propositionForm";
import ContributionToArt from "../Pages/User/Forms/contributionForm";
import ValidateProposal from "../Pages/Admin/ValidateProp/ValidateProp";
import UserContributions from "../Pages/Admin/Contributions/UserContributions";
import DetailsContributionUser from "../Pages/Admin/Contributions/DetailsContributionUser";
import DetailsProposition from "../Pages/Admin/Propositions/DetailsProposition";
import DetailsContribution from "../Pages/Admin/Contributions/DetailsContribution";
import UserProfile from "../Pages/User/UserProfile";
import DetailsArtwork from "../Pages/Guest/Search/DetailsArtwork";
import Search from "../Pages/Guest/Search/Search";
import DetailsUser from "../Pages/Guest/Search/DetailsUser";
import UpdateInfo from "../Pages/User/UpdateInfo";
import UserTrophies from "../Pages/Admin/Trophies/UserTrophies";
import FavoriteArtworks from "../Pages/User/Favorites/FavoriteArtworks";
import FavoriteArtworkDetails from "../Pages/User/Favorites/FavoriteArtworkDetails";
import FavoriteArtists from "../Pages/User/Favorites/FavoriteArtists";
import FavoriteArtistDetails from "../Pages/User/Favorites/FavoriteArtistDetails";

type routesType = {
  name: string;
  path: string;
  element: any;
}[];

const routes: routesType = [
  {
    name: "MapUser",
    path: "/",
    element: MapUser,
  },
  {
    name: "MapAdmin",
    path: "map/admin",
    element: MapAdmin,
  },
  {
    name: "FormAdmin",
    path: "form/admin",
    element: FormAdmin,
  },
  {
    name: "SignIn",
    path: "login",
    element: SignIn,
  },
  {
    name: "SignUp",
    path: "/sign-up",
    element: SignUp,
  },
  {
    name: "ArtworkModifyAdmin",
    path: "admin/modifyForm",
    element: ModifyArtAdmin,
  },
  {
    name: "ContributionArtUser",
    path: "user/contribution",
    element: ContributionToArt,
  },
  {
    name: "ArtworkProposeUser",
    path: "user/ProposeArtwork",
    element: ProposeArtUser,
  },
  {
    name: "ValidateProposalAdmin",
    path: "admin/validateProposal",
    element: ValidateProposal,
  },
  {
    name: "DetailsProposition",
    path: "admin/details-proposition",
    element: DetailsProposition,
  },
  {
    name: "DetailsContribution",
    path: "admin/details-contribution",
    element: DetailsContribution,
  },
  {
    name: "UserProfile",
    path: "/profil",
    element: UserProfile,
  },
  {
    name: "UserTrophies",
    path: "/Trophies",
    element: UserTrophies,
  },
  {
    name: "UserContributions",
    path: "/contribution",
    element: UserContributions,
  },
  {
    name: "DetailsContributionUser",
    path: "UserDetailsContribution",
    element: DetailsContributionUser,
  },
  {
    name: "UpdatePersonalInfo",
    path: "UpdateInfo",
    element: UpdateInfo,
  },
  {
    name: "FavoriteArtworks",
    path: "/favorite-artworks",
    element: FavoriteArtworks,
  },
  {
    name: "FavoriteArtworks",
    path: "/favorite-artwork-details",
    element: FavoriteArtworkDetails,
  },
  {
    name: "FavoriteArtists",
    path: "/favorite-artists",
    element: FavoriteArtists,
  },
  {
    name: "FavoriteArtworks",
    path: "/favorite-artist-details",
    element: FavoriteArtistDetails,
  },
  {
    name: "DetailsArtwork",
    path: "details-artwork",
    element: DetailsArtwork,
  },
  {
    name: "UserProfile",
    path: "/users-profile",
    element: DetailsUser,
  },
  {
    name: "SearchArtwork",
    path: "search",
    element: Search,
  },
];

export default routes;
