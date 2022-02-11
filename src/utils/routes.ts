import MapAdmin from "../Pages/Admin/Map/map";
import Map from "../Pages/User/Map/map";
import FormAdmin from "../Pages/Admin/Form/createForm";

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
  {
    name: "FormAdmin",
    path: "form/admin",
    element: FormAdmin,
  },
  // TODO: à decommenter quand les pages d'inscription et d'authentification
  // seront prêtes + il faudra changer le path de MapUser en map par exemple
  //   {
  //     name: "SignIn",
  //     path: "/",
  //     element: Authentification,
  //   },
  //   {
  //     name: "SignUp",
  //     path: "/sign-up",
  //     element: Register,
  //   },
];

export default routes;
