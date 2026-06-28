import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginHandler, loading } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <section className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl bg-[#0F172A] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-[#111C33]">
          <h1 className="text-5xl font-bold leading-tight text-[#F8F4EC]">
            Welcome Back
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            Login to your account to create and manage your Tasks
          </p>

          <div className="mt-10 h-[2px] w-24 bg-[#F8F4EC]" />
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#F8F4EC]">Login</h2>

            <p className="text-gray-400 mt-2">
              Access your account to continue
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await loginHandler(formData);
              } catch (error) {
                setErrorMessage(
                  error.response.data.message ||
                    error.response.data.errors[0].msg,
                );
              }
            }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="text-[#F2F2F2]">
              <label className="block mb-2 text-sm font-medium">Email</label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-700 bg-[#1E293B] text-white placeholder:text-gray-400 px-5 py-4 outline-none focus:border-[#035A27] transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="text-[#F2F2F2]">
              <label className="block mb-2 text-sm font-medium">Password</label>

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-700 bg-[#1E293B] text-white placeholder:text-gray-400 px-5 py-4 outline-none focus:border-[#035A27] transition-all duration-300"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 font-semibold italic">
                ⚠️ {errorMessage}
              </p>
            )}
            {/* Button */}
            {loading ? (
              <p className="w-full text-center bg-[#035A27] text-[#F8F4EC] py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition-all duration-300">
                Logging in <span className="animate-bounce">...</span>
              </p>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#035A27] text-[#F8F4EC] py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition-all duration-300"
              >
                Login
              </button>
            )}
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#F2F2F2] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
