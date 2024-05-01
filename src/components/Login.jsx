import React, { useState } from "react";
import { auth } from "../firebase-config"; // file not included in git repo
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [user, setUser] = useState(null);

  const LoginAccount = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const LoggedInUser = userCredentials.user;
        setUser(LoggedInUser);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={LoginAccount}>
        <h1>Login to your Account</h1>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {user ? <h1>Welcome {user.email}</h1> : null}
    </div>
  );
}
