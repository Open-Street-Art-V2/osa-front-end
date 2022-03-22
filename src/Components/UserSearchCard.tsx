import { FcManager } from "react-icons/fc";
import { User } from "../types/user";

type Props = {
  data: User;
};

export default function UserSearchCard(props: Props) {
  const { data } = props;

  return (
    <div className="flex flex-row col-span-5">
      <div className="flex-none w-28 h-24">
        <FcManager className="items-center text-8xl" />
      </div>
      <div className="grid place-content-evenly overflow-hidden ml-3">
        <div className="text-slate-900 text-lg overflow-hidden">
          {data?.firstname} {data?.name}
        </div>
      </div>
    </div>
  );
}
