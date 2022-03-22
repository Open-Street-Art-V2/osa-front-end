import MapAdmin from "../Pages/Admin/Map/map";
import SignIn from "../Pages/Guest/SignIn/SignIn";
import SignUp from "../Pages/Guest/SignUp/SignUp";
import MapUser from "../Pages/User/Map/map";
import FormAdmin from "../Pages/Admin/Form/createForm";
import ModifyArtAdmin from "../Pages/Admin/FormMod/ModifyArtwork";
import ProposeArtUser from "../Pages/User/Forms/propositionForm";
import ContributionToArt from "../Pages/User/Forms/contributionForm";
import ValidateProposal from "../Pages/Admin/ValidateProp/ValidateProp";
import DetailsProposition from "../Pages/Admin/Propositions/DetailsProposition";
import DetailsContribution from "../Pages/Admin/Contributions/DetailsContribution";
import UserProfile from "../Pages/User/UserProfile";
import DetailsArtwork from "../Pages/Guest/Search/DetailsArtwork";
import Search from "../Pages/Guest/Search/Search";

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
    name: "UserProfile",
    path: "/profil",
    element: UserProfile,
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
    name: "DetailsArtwork",
    path: "details-artwork",
    element: DetailsArtwork,
  },
  {
    name: "SearchArtwork",
    path: "search",
    element: Search,
  },
];

export default routes;
