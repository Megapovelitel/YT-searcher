import config from "./auth.config";
import jwt from "jsonwebtoken";

const signIn = (username) => {
  let token = jwt.sign({ username: username }, config.secret, {
    expiresIn: 86400, // 24 hours
  });
  localStorage.setItem(
    "currentUser",
    JSON.stringify({ username: username, token: token })
  );
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

const logOut = () => {
  localStorage.removeItem("currentUser");
  window.location = "/";
};

const isAuth = () => {
  const user = getCurrentUser();
  if (user) {
    jwt.verify(user.token, config.secret, (err) => {
      if (err) return false;
    });

    return true;
  }
  return false;
};

export default {
  signIn,
  logOut,
  getCurrentUser,
  isAuth,
};
