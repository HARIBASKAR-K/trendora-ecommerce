import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border p-3 rounded-xl"
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-semibold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}