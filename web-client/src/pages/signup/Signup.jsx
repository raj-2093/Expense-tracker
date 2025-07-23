import React, { useEffect, useState } from "react";
import { login } from "../../apis/auth/auth.api";
import { useAuth } from "../../context/auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userCreds, setUserCreds] = useState({
    fullName: "", 
    userName: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const {
    registerUserWithEmailAndPassword,
    isUserLoggedIn
  } = useAuth();

  useEffect(()=>{
    if(isUserLoggedIn) {
    navigate("/")
  }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();

    registerUserWithEmailAndPassword(userCreds.fullName, userCreds.email, userCreds.userName, userCreds.password).then(res => {
      navigate("/login")
    }).catch(err => console.log(`Login page > onSubmit > loginUserWithEmailAndPassword - err - ${err}`))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] page-sections-wrapper">
      <form onSubmit={onSubmit} className="p-0">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">
            <h1 className="text-2xl">Sign up</h1>
          </legend>
          {/* <legend className="fieldset-legend">
            Login
          </legend> */}

          <div className="input-elements flex flex-col items-center justify-center gap-3.5">
            <div>
              <label className="label">
                Please Enter your Full Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="Full name here"
                value={userCreds.fullName}
                onChange={(e)=>{
                  setUserCreds((creds) => {
                    return {
                      ...creds, fullName: e.target.value
                    }
                  })
                }}
              />
              {/* <p className="label">Optional</p> */}
            </div>

            <div>
              <label className="label">
                Please Enter your email
              </label>
              <input
                type="text"
                className="input"
                placeholder="Email here"
                value={userCreds.email}
                onChange={(e)=>{
                  setUserCreds((creds) => {
                    return {
                      ...creds, email: e.target.value
                    }
                  })
                }}
              />
              {/* <p className="label">Optional</p> */}
            </div>

            <div>
              <label className="label">
                Please Enter your Username
              </label>
              <input
                type="text"
                className="input"
                placeholder="Username here"
                value={userCreds.userName}
                onChange={(e)=>{
                  setUserCreds((creds) => {
                    return {
                      ...creds, userName: e.target.value
                    }
                  })
                }}
              />
              {/* <p className="label">Optional</p> */}
            </div>

            <div>
              <label className="label">Please Enter your password</label>
              <input type="text" className="input" placeholder="Password"
              value={userCreds.password}
              onChange={(e)=>{
                  setUserCreds((creds) => {
                    return {
                      ...creds, password: e.target.value
                    }
                  })
                }}
              />
              {/* <p className="label">Optional</p> */}
            </div>

            <input type="submit" value="Submit" className="btn" />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
