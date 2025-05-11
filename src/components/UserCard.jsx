import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, skills, about, photoUrl } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm overflow-hidden">
      <img
        alt={`${firstName} ${lastName}'s picture`}
        className="w-full h-64 object-cover"
        src={photoUrl || "https://via.placeholder.com/400x300"}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-gray-600 mt-1">
            {age}, {gender}
          </p>
        )}
        {skills && (
          <p className="text-gray-600 mt-2">
            <span className="font-semibold">Skills:</span>{" "}
            {Array.isArray(skills) ? skills.join(", ") : skills}
          </p>
        )}
        {about && (
          <p className="text-gray-600 mt-2 line-clamp-3">
            <span className="font-semibold">About:</span> {about}
          </p>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
