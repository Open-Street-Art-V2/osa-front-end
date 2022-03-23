import { FcManager } from "react-icons/fc";
import { User } from "../types/user";

type Props = {
  data: User;
};

export default function UserSearchCard(props: Props) {
  const { data } = props;

  return (
    <div className="flex flex-row col-span-5">
      <div className="flex items-center justify-center w-28 h-20">
        <FcManager className="w-20 h-20" />
      </div>
      <div className="grid place-content-evenly overflow-hidden ml-3">
        <div className="text-slate-900 text-lg overflow-hidden">
          {data?.firstname} {data?.name}
        </div>
      </div>
    </div>
  );
}
