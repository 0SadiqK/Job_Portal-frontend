import { useState } from "react";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registered successfully!");
      } else {
        setMessage("❌ " + data.msg);
      }
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" required
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" required
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>

        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
