import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "@/store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createUser(formData)).unwrap();
      alert("User registered successfully!");
      navigate("/home");
    } catch (err) {
      alert(err.message || "Registration failed.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="h-screen w-[80vw] flex justify-center items-center">
      <form onSubmit={submitHandler}>
        <div className="font-bold text-4xl mb-10 ">
          <h1>S N K R S</h1>
        </div>
        <div>
          <p className="text-2xl">Enter your details to register</p>
          <div className="flex flex-col">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
              name="name"
              className="ml-5 text-xl w-[200px] h-[60px] sm:w-[400px] border-2 border-black rounded-2xl p-4 mt-5"
              type="text"
              placeholder="Name"
              required
              onChange={handleInputChange}
              value={formData.name}
            />
            <input
              name="email"
              className="ml-5 text-xl w-[200px] h-[60px] sm:w-[400px] border-2 border-black rounded-2xl p-4 mt-5"
              type="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
              value={formData.email}
            />
            <input
              name="password"
              className="w-[200px] text-xl h-[60px] sm:w-[400px] border-2 border-black rounded-2xl p-4 mt-5 ml-5"
              type="password"
              placeholder="Password"
              required
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>
        </div>
        <div className="text-right mt-5">
          <p>
            Already have an account?
            <Link className="font-medium" to={"/user/login"}>
              Login
            </Link>
          </p>
        </div>
        <div className="mt-5 flex gap-1">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="w-[200px] h-[50px] bg-black text-xl text-white rounded-2xl m-5"
          >
            {isLoading ? "Registering..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;