"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [link, setLink] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) setLoggedIn(true);
    else alert("Wrong password");
  };

  const generateLink = async () => {
    const res = await fetch("/api/generate-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, upiId }),
    });

    if (res.ok) {
      const data = await res.json();
      setLink(data.url);
    } else {
      alert("Unauthorized");
    }
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Generate Payment Link</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="UPI ID"
        value={upiId}
        onChange={e => setUpiId(e.target.value)}
      />

      <button onClick={generateLink}>Generate</button>

      {link && (
        <div>
          <p>Secure Link:</p>
          <input value={link} readOnly style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
}
