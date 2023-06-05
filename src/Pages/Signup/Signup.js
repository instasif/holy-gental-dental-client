import React, { useContext, useState } from "react";
import GoogleBtn from "../../Componants/GoogleBtn/GoogleBtn";
import FbBtn from "../../Componants/FbBtn/FbBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { useToken } from "../../hooks/useToken";

const Signup = () => {
  const { signUp, updateUser } = useContext(AuthContext);
  const [createdEmail, setCreatedEmail] = useState("");

  //! navigate <<<<--------------
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [token] = useToken(createdEmail);
  if (token) {
    navigate(from, { replace: true });
  }

  //! react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignup = (data) => {
    const { name, email, password, number } = data;
    signUp(email, password)
      .then((res) => {
        const userInfo = {
          displayName: name,
        };
        updateUser(res?.user, userInfo)
          .then(() => {
            saveUser(name, email, number);
          })
          .catch((err) => {
            if (err) {
              toast.error(err?.message);
            }
          });
        if (res?.user?.uid) {
          toast.success("Successfully signup!");
        }
      })
      .catch((err) => {
        if (err?.message) {
          toast.error(err?.message);
        }
      });
  };

  const saveUser = (name, email, number) => {
    const user = { name, email, number };
    fetch("https://holy-gental-dental-server.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setCreatedEmail(email);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center ">
      <div className="w-96 p-7 border-2">
        <h2 className="text-2xl text-center">Signup Here!</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              {...register("name", {
                required: "Full name is required",
                maxLength: {
                  value: 20,
                  message: "please re-check your name it's too long",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p role="alert" className="text-red-600 mt-2 text-xs">
                {errors.name?.message}
              </p>
            )}
          </div>

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
              maxLength: { value: 20 },
              pattern: {
                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                message:
                  "Password must one capital latter, one special case, one number.",
              },
            })}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.password && (
            <p role="alert" className="text-red-600 mt-2 text-xs">
              {errors.password?.message}
            </p>
          )}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="tel"
              placeholder="phone"
              {...register("number", {
                required: "Phone number is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.number && (
              <p role="alert" className="text-red-600 mt-2 text-xs">
                {errors.number?.message}
              </p>
            )}
          </div>
          <label className="label">
            <Link to={"#"} className="text-xs hover:underline">
              Forget password?
            </Link>
          </label>
          <input
            type="submit"
            value="Sign Up"
            className="btn btn-primary bg-gradient-to-r from-secondary to-primary w-full max-w-xs mt-3 text-white"
          />
        </form>
        <p className="text-xs text-center mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary hover:underline">
            Login here.
          </Link>
        </p>
        <div className="divider">OR</div>
        <GoogleBtn />
        <FbBtn />
      </div>
    </div>
  );
};

export default Signup;
