import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/layout/PagesLayout";
import SignIn from "../pages/signin/SignInView";
import Profile from "../pages/profile/ProfileView";
import Error from "../pages/error/ErrorView";
import Home from "../pages/home/homeView";
import { useDispatch, useSelector } from "react-redux";
import { setData, setToken } from "../store/store";
import { useEffect } from "react";

export default function Router() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  async function fetchData() {
    return fetch("http://localhost:3001/api/v1/user/profile", {
      method: "post",
      headers: {
        Authorization: `Bearer  ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      dispatch(setToken(tokenFromStorage))
    }
  }, []);
  useEffect(() => {
    if(token) {
      fetchData().then((data) => {
        dispatch(setData(data.body));
      });
    }
  }, [token]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home signMethod="Sign In" />} />
        <Route
          path="/login"
          element={
            !token ? (
              <SignIn signMethod="Sign In" />
            ) : (
              <Navigate replace to="/profile" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            token ? (
              <Profile signMethod="Sign Out" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
