import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills, about, photoUrl } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img alt="User picture" className="" src={photoUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{skills}</p>
        <p>{about}</p>
        <div className="card-actions justify-center ">
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
