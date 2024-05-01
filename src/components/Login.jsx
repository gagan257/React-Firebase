import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config"; // file not included in git repo
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

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

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User Logged Out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

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
      {user ? (
        <div>
          {" "}
          <p>Welcome {user.email}</p> <button onClick={logOut}>Log Out</button>{" "}
        </div>
      ) : (
        <p>You are not Logged In</p>
      )}
    </div>
  );
}
