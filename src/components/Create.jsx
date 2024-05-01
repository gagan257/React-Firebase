import React, { useState } from "react";
import { auth } from "../firebase-config"; // file not included in git repo
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Create() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const CreateAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        console.log(userCredentials);
      }
    );
  };

  return (
    <div>
      <form onSubmit={CreateAccount}>
        <h1>Create a New Account</h1>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
