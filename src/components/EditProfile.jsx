import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState();
  const [tost, setTost] = useState(false);

  const dispatch = useDispatch();
  const updateUser = async () => {
    try {
      //prettier-ignore
      const res = await axios.patch(BASE_URL+"/profile/edit",{ firstName, lastName, age, gender, skills, about, photoUrl}, {withCredentials:true});
      dispatch(addUser(res?.data?.data));

      setTost(true);
      setTimeout(() => {
        setTost(false);
      }, 3000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.errors);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="flex mt-5 gap-5 justify-center">
        {tost && (
          <div>
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>User data Updated Successfully</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center ">
          <div className="card bg-base-300 w-96 shadow-sm rounded-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Image</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    className="input"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-950 font-bold text-xl">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={updateUser}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <div>
            <UserCard
              //prettier-ignore
              user = { {firstName, lastName, age, gender, skills, about, photoUrl} }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
