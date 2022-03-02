import MapPage from "../Pages/Test/MapPage";

// TODO: utiliser Link ou useNavigate de react-rooter pour la navigation
// entre les pages (voir la documentation)

type routesType = {
  name: string;
  path: string;
  element: any;
}[];

const routes: routesType = [
  {
    name: "MapPage",
    path: "/",
    element: MapPage,
  },
];

export default routes;
