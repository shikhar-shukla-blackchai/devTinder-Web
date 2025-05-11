import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed <= 0)
    return <h1>User Feed is completed, No New user left to interact!!!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
