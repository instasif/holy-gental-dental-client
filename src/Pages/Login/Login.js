import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleBtn from "../../Componants/GoogleBtn/GoogleBtn";
import FbBtn from "../../Componants/FbBtn/FbBtn";
import { AuthContext } from "../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { useToken } from "../../hooks/useToken";

const Login = () => {
  const { logIn } = useContext(AuthContext);
  const [loginEmail, setLoginEmail] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [token] = useToken(loginEmail);
  if (token) {
    navigate(from, { replace: true });
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;
    logIn(email, password)
      .then((res) => {
        const user = res.user;
        setLoginEmail(user?.email);
        if (user?.uid) {
          toast.success("Successfully login");
        }
      })
      .catch((err) => {
        if (err?.message) {
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center ">
      <div className="w-96 p-7 border-2">
        <h2 className="text-2xl text-center">Login Here!</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p role="alert" className="text-red-600 mt-2 text-xs">
                {errors.email?.message}
              </p>
            )}
          </div>

          <label className="label">
            <span className="label-text">password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be minimum 8 character or longer.",
              },
              max: 20,
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.password && (
            <p role="alert" className="text-red-600 mt-2 text-xs">
              {errors.password?.message}
            </p>
          )}
          <label className="label">
            <Link to={"#"} className="text-xs hover:underline">
              Forget password?
            </Link>
          </label>
          <input
            type="submit"
            value="Login"
            className="btn btn-primary bg-gradient-to-r from-secondary to-primary w-full max-w-xs mt-3 text-white"
          />
        </form>
        <p className="text-xs text-center mt-2">
          New to Doctors Portal?{" "}
          <Link to="/signup" className="text-secondary hover:underline">
            Create an account.
          </Link>
        </p>
        <div className="divider">OR</div>
        <GoogleBtn />
        <FbBtn />
      </div>
    </div>
  );
};

export default Login;
