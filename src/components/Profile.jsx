import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Your Profile
          </h2>
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
