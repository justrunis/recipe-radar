import { getUserId } from "../Auth/auth";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { variables } from "../Variables";
import { useState } from "react";
import { formatDate } from "../Helpers/functions";

export default function Profile({ token }) {
  const userId = getUserId(token);
  console.log("userId", userId);
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    created_at: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const URL = variables.API_URL + "getUser/" + userId;
      try {
        fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              return response.json().then((error) => {
                throw new Error(error);
              });
            }
          })
          .then((data) => {
            console.log("data", data);
            setUser(data);
          })
          .catch((error) => {
            console.error("Error getting user:", error);
          });
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    const test = fetchData();
    console.log("test", test);
  }, [userId, token]);

  return (
    <>
      <Header token={token} />
      <div className="profile-container">
        <div className="profile-card mx-2">
          <h2>Profile</h2>
          <table className="profile-table">
            <tbody>
              <tr>
                <td className="profile-label">Username:</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td className="profile-label">Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td className="profile-label">Role:</td>
                <td>{user.role}</td>
              </tr>
              <tr>
                <td className="profile-label">Created at:</td>
                <td>{formatDate(user.created_at)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
