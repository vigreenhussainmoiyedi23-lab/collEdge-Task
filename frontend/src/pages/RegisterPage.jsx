import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RegisterPage = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { registerHandler, loading } = useAuth();
  return (
    <section className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-6xl bg-[#0F172A] rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-[#111C33]">
          <h1 className="text-5xl font-bold leading-tight text-[#F8F4EC]">
            Join SHE CAN FOUNDATION
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            Become a part of a community focused on empowerment, education,
            support, and creating opportunities that make a real difference.
          </p>

          <div className="mt-10 h-[2px] w-24 bg-[#F8F4EC]" />
        </div>
        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-[#F8F4EC]">Register</h2>

            <p className="text-gray-400 mt-3 text-base">
              Create your account and become part of the movement.
            </p>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setErrorMessage("");
              try {
                await registerHandler(formData);
              } catch (error) {
                setErrorMessage(error);
              }
            }}
            className="space-y-6"
          >
            {/* Username */}
            <div className="text-[#F2F2F2]">
              <label className="block mb-2 text-sm font-medium">Username</label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setformData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your username"
                className="w-full rounded-2xl border border-slate-700 bg-[#1E293B] text-white placeholder:text-gray-400 px-5 py-4 outline-none focus:border-[#035A27] focus:ring-2 focus:ring-[#035A27]/30 transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="text-[#F2F2F2]">
              <label className="block mb-2 text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setformData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-700 bg-[#1E293B] text-white placeholder:text-gray-400 px-5 py-4 outline-none focus:border-[#035A27] focus:ring-2 focus:ring-[#035A27]/30 transition-all duration-300"
              />
            </div>

            {/* Password */}
            <div className="text-[#F2F2F2]">
              <label className="block mb-2 text-sm font-medium">Password</label>

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, password: e.target.value })
                }
                placeholder="Create a strong password"
                className="w-full rounded-2xl border border-slate-700 bg-[#1E293B] text-white placeholder:text-gray-400 px-5 py-4 outline-none focus:border-[#035A27] focus:ring-2 focus:ring-[#035A27]/30 transition-all duration-300"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 font-semibold italic">
                ⚠️ {errorMessage}
              </p>
            )}
            {/* Button */}
            {loading ? (
              <p className="w-full text-center bg-[#035A27] hover:bg-[#047735] text-[#F8F4EC] py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-green-900/20">
                Creating...
              </p>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#035A27] hover:bg-[#047735] text-[#F8F4EC] py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-green-900/20"
              >
                Create Account
              </button>
            )}
          </form>

          {/* Bottom Text */}
          <p className="text-gray-400 text-sm mt-8 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#F2F2F2] font-semibold hover:text-[#7ED957] transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
