import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requests";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/received/request", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
      console.log(requests);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (requests === 0) {
    return <h1>Not a single person has sended you the connection request</h1>;
  }
  if (!requests) return;

  return (
    <div>
      <div className="flex flex-row justify-center my-5 border-base-300">
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 bg-base-200 opacity-60 tracking-wide text-2xl font-bold">
            Requests
          </li>

          {requests &&
            requests.map((request, index) => {
              const { _id, firstName, lastName, about, photoUrl } =
                request.fromUserId;
              console.log(request);
              return (
                <li className="list-row bg-base-300 " key={_id}>
                  <div className="text-4xl font-thin opacity-30 tabular-nums">
                    {index + 1}
                  </div>
                  <div>
                    <img className="size-10 rounded-box" src={photoUrl} />
                  </div>
                  <div className="list-col-grow">
                    <div>{firstName + " " + lastName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {about}
                    </div>
                  </div>
                  <button
                    className="btn btn-neutral"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-error "
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
