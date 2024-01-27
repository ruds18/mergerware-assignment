import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        Meteor.call("users.login", { email ,password}, (error,res) => {
          if (error) {
            console.error("Error login user:", error.reason);
          } else {
            console.log("User created successfully");
            localStorage.setItem("role" , res.role);
            localStorage.setItem("email" , email)
            navigate("/");
          }
        });
      };

  return (
    <div className="bg-grey-300 h-dvh flex  justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-[25%] ">
        <h1 className="text-2xl text-center">Welcome user!</h1>
        <form
          className="h-full w-full flex flex-col justify-center"
          onSubmit={(e) => handelSubmit(e)}
        >
          <p className="text-center mt-[3rem] mb-[1rem]">Login</p>
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
             <Link to='/signup'>Signup</Link>
          </div>
          <button
            type="submit"
            className="bg-black text-white mt-[2rem] px-3 py-2 rounded-lg"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login