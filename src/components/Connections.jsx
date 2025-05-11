import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connections";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err.response?.data?.errors || err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Connections
        </h2>
        {!connections ? (
          <p className="text-center text-gray-600">Loading connections...</p>
        ) : connections.length === 0 ? (
          <p className="text-center text-gray-600">Make some online friends!</p>
        ) : (
          <ul className="space-y-4">
            {connections.map((connect, index) => {
              const { _id, firstName, lastName, age, gender, about, photoUrl } =
                connect;
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
                    {age && gender && (
                      <div className="text-sm text-gray-600">
                        {age}, {gender}
                      </div>
                    )}
                    {about && (
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {about}
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400 text-2xl font-thin">
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

export default Connections;
