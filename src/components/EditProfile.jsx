import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [tost, setTost] = useState(false);

  const dispatch = useDispatch();

  const updateUser = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, skills, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      setTost(true);
      setTimeout(() => {
        setTost(false);
      }, 3000);
      setError("");
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.errors || "Invalid input data");
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-8">
      <div className="max-w-md w-full mx-auto px-4">
        {tost && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>User data updated successfully</span>
            </div>
          </div>
        )}
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          {/* Profile Preview Section */}
          <div className="flex flex-col items-center mb-4">
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-500"
              src={photoUrl || "https://via.placeholder.com/150"}
              alt={`${firstName} ${lastName}`}
            />
            <h2 className="text-xl font-bold text-gray-800 mt-3">
              {firstName} {lastName}
            </h2>
            {age && gender && (
              <p className="text-gray-600 text-sm mt-1">
                {age}, {gender}
              </p>
            )}
            {skills && (
              <p className="text-gray-600 text-sm mt-1 text-center">
                <span className="font-semibold">Skills:</span>{" "}
                {Array.isArray(skills) ? skills.join(", ") : skills}
              </p>
            )}
            {about && (
              <p className="text-gray-600 text-sm mt-1 text-center line-clamp-2">
                <span className="font-semibold">About:</span> {about}
              </p>
            )}
          </div>

          {/* Edit Profile Section */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
            Edit Profile
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Gender
              </label>
              <input
                type="text"
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Skills
              </label>
              <input
                type="text"
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                About
              </label>
              <textarea
                className="w-full px-3 py-1.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-pink-500 text-sm"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="2"
              />
            </div>
          </div>
          {error && (
            <div className="mt-3 p-2 bg-red-100 text-red-700 rounded-lg text-center text-sm">
              {error}
            </div>
          )}
          <div className="mt-4">
            <button
              className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold hover:opacity-90 transition-opacity text-sm"
              onClick={updateUser}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
