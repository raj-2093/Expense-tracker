import React, { useEffect, useState } from "react";
import { login } from "../../apis/auth/auth.api";
import { useAuth } from "../../context/auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userCreds, setUserCreds] = useState({
    userId: "",
    password: ""
  })

  const navigate = useNavigate();
  const {
    loginUserWithEmailAndPassword,
    isUserLoggedIn
  } = useAuth();

  useEffect(()=>{
    if(isUserLoggedIn) {
    navigate("/")
  }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();

    loginUserWithEmailAndPassword(userCreds.userId, userCreds.password).then(res => {
      navigate("/")
    }).catch(err => console.log(`Login page > onSubmit > loginUserWithEmailAndPassword - err - ${err}`))
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] page-sections-wrapper">
      <form onSubmit={onSubmit} className="p-0">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">
            <h1 className="text-2xl">Login</h1>
          </legend>
          {/* <legend className="fieldset-legend">
            Login
          </legend> */}

          <div className="input-elements flex flex-col items-center justify-center gap-3.5">
            <div>
              <label className="label">
                Please Enter your email or username
              </label>
              <input
                type="text"
                className="input"
                placeholder="Email or username"
                value={userCreds.userId}
                onChange={(e)=>{
                  setUserCreds((creds) => {
                    return {
                      ...creds, userId: e.target.value
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
        <p>Don't have an account? <Link className="" to={"/signup"}><b>Sign up</b></Link> instead</p>
        </fieldset>

      </form>
    </div>
  );
}
