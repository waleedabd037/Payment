"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [link, setLink] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ added
  const [copied, setCopied] = useState(false);

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
      setCopied(false); // reset copy state
    } else {
      alert("Unauthorized");
    }
  };

  // ✅ added
  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
        <div style={{ marginTop: 12 }}>
          <p>Secure Link:</p>

          <div style={{ display: "flex", gap: 8 }}>
            <input value={link} readOnly style={{ flex: 1 }} />
            <button onClick={copyLink}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
