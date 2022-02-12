import MapAdmin from "../Pages/Admin/Map/map";
import SignIn from "../Pages/Guest/SignIn/SignIn";
import Map from "../Pages/User/Map/map";

// TODO: utiliser Link ou useNavigate de react-rooter pour la navigation
// entre les pages (voir la documentation)

type routesType = {
  name: string;
  path: string;
  element: any;
}[];

const routes: routesType = [
  {
    name: "MapUser",
    path: "/",
    element: Map,
  },
  {
    name: "MapAdmin",
    path: "map/admin",
    element: MapAdmin,
  },
  // TODO: à decommenter quand les pages d'inscription et d'authentification
  // seront prêtes + il faudra changer le path de MapUser en map par exemple
  {
    name: "SignIn",
    path: "/login",
    element: SignIn,
  },
  //   {
  //     name: "SignUp",
  //     path: "/sign-up",
  //     element: Register,
  //   },
];

export default routes;
