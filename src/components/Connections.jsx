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
      console.error(err.response.data.errors);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  //   if (!connections) return;
  //   if (connections.length === 0) return <h2>Make some online Friends</h2>;

  return (
    <div>
      <div className="flex flex-row justify-center my-5 border-base-300">
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 bg-base-200 opacity-60 tracking-wide text-2xl font-bold">
            Connections{" "}
          </li>

          {connections &&
            connections.map((connect, index) => {
              const { _id, firstName, lastName, age, gender, about, photoUrl } =
                connect;
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
                    {age && gender && <div>{age + ", " + gender}</div>}
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {about}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
