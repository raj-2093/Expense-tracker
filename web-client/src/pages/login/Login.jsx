import React from "react";
import { login } from "../../apis/auth/auth.api";

export default function Login() {

  const onSubmit = (e) => {
    e.preventDefault();
    login("abc@xyz.com", "123456")
    .then((res)=> {
      console.log(`rj_ onSubmit login res - ${res}`)
    })
    .catch(err => console.log(`rj_ onSubmit login err - ${err}`))
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
          <label className="label">Please Enter your email or username</label>
          <input
            type="text"
            className="input"
            placeholder="Email or username"
          />
          {/* <p className="label">Optional</p> */}
        </div>

<div>
          <label className="label">Please Enter your password</label>
          <input type="text" className="input" placeholder="Password" />
          {/* <p className="label">Optional</p> */}
</div>

          <input type="submit" value="Submit" className="btn" />
</div>
        </fieldset>
      </form>
    </div>
  );
}
