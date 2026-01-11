import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch {
      setError("Account already exists");
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border p-3 rounded-xl"
            required
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border p-3 rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border p-3 rounded-xl"
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}