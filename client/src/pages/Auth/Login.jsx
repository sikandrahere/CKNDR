import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/authSlice"; // Import the async thunk
import { Toaster, toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth); // Get loading and error state from Redux
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit login form
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const result = await dispatch(loginUser(formData)).unwrap(); // Dispatch loginUser thunk and unwrap response

      // Save user role and token locally
      localStorage.setItem("token", result.data.user._id);
      localStorage.setItem("role", result.data.user.role);

      toast.success("User logged in successfully!");

      
      navigate(result.data.user.role === "admin" ? "/admin/orders" : "/");
    } catch (err) {
      // Toastr error notification
      toast.error(err.message || "Login failed!");
      console.error("Error during login:", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-[80vw]">
       <Toaster position="top-center" />
      <form onSubmit={submitHandler}>
        {/* Header */}
        <div className="font-bold text-4xl mb-10 mt-20">
          <h1>S N K R S</h1>
        </div>

        <div>
          <p className="text-2xl">Enter your email and password to log in</p>
          <div className="flex flex-col">
    

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
            Don't have an account?{" "}
            <Link className="font-medium" to={"/user/register"}>
              Register
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
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Logging in..." : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;