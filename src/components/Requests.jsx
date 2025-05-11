import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requests";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/received/request", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Connection Requests
        </h2>
        {!requests ? (
          <p className="text-center text-gray-600">Loading requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-600">
            No one has sent you a connection request yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {requests.map((request, index) => {
              const { _id, firstName, lastName, about, photoUrl } =
                request.fromUserId;
              return (
                <li
                  key={_id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={photoUrl || "https://via.placeholder.com/50"}
                      alt={`${firstName} ${lastName}`}
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="text-lg font-semibold text-gray-800">
                      {firstName} {lastName}
                    </div>
                    {about && (
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {about}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                  <div className="text-gray-400 text-2xl font-thin ml-4">
                    {index + 1}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
