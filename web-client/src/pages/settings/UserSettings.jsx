import React, { useEffect } from "react";
import { useAuth } from "../../context/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const { isUserLoggedIn, logoutUser, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }

    console.log(`rj_ user -- ${JSON.stringify(user)}`);
  }, []);

  const logout = () => {
    logoutUser()
      .then((res) => {
        console.log("logged out");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-between gap-7 max-w-[80vw] pt-10 pb-10 ml-auto mr-auto">
      <div className="userInfo flex flex-col gap-7">
        <h2 className="text-4xl">{user?.fullName}</h2>
        <div className="userInfo-wrapper flex flex-col gap-2">
          <div className="fullname">Full name : {user?.fullName}</div>
          <div className="email">Email ID : {user?.email}</div>
          <div className="fullname">Username : {user?.userName}</div>
          {/* <div className="fullname">Full name : {user?.fullName}</div> */}
        </div>
      </div>
      <div className="logout">
        <button className="btn btn-warning" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
