import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [role , setRole] = useState("");
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    Meteor.call("users.signup", { email,role ,password}, (error) => {
      if (error) {
        console.error("Error creating user:", error.reason);
      } else {
        console.log("User created successfully");
        localStorage.setItem("role" , role);
        localStorage.setItem("email" , email)
        navigate("/");
      }
    });
  };
  console.log(role)
  return (
    <div className="bg-grey-300 h-dvh flex  mx-5 md:mx-0 justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-full md:w-[25%] ">
        <h1 className="text-2xl text-center">Create Account</h1>
        <form
          className="h-full w-full flex flex-col justify-center"
          onSubmit={(e) => handelSubmit(e)}
        >
          <p className="text-center mt-[1rem] mb-[1rem]">Signup</p>
          <input
            className="mt-4 px-4 py-2"
            type="email"
            placeholder="enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <input
            className="mt-4 mb-4 px-4 py-2"
            type="password"
            placeholder="enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           
           <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
            <input
            type="radio"
            name="role"
            value="Admin"
            required
            onChange={(e) => setRole(e.target.value)}
          />
         
          <label className="ml-2">Admin</label>
          </div>
           
          <div className="flex items-center">
            <input
            type="radio"
            name="role"
            value="Borrower"
            onChange={(e) => setRole(e.target.value)}
          />
         
          <label className="ml-2">Borrower</label>
          </div>
          <div className="flex items-center">
            <input
            type="radio"
            name="role"
            value="Lender"
            onChange={(e) => setRole(e.target.value)}
          />
        
          <label className="ml-2">
            Lender
          </label>
          </div>
          </div>
          <Link to="/login" className="font-light mx-3 my-4 text-gray-500">Login?</Link>
          <button
            type="submit"
            className="bg-black text-white mt-[1rem] px-3 py-2 rounded-lg"
          >
            Lets go!
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Signup;
