import { getUserId } from "../Auth/auth";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { variables } from "../Variables";
import { formatDate } from "../Helpers/functions";
import { useFetch } from "../Hooks/useFetch";
import { makeGetRequest } from "../Helpers/databaseRequests";
import Error from "../Components/Error";

const userId = getUserId(localStorage.getItem("jwtToken"));
console.log(userId);

async function fetchUser() {
  const user = await makeGetRequest(variables.API_URL + "getUser/" + userId);
  return new Promise((resolve) => {
    resolve(user);
  });
}

export default function Profile({ token }) {
  const {
    isFetching,
    fetchedData: user,
    setFetchedData: setUser,
    error,
  } = useFetch(fetchUser, []);

  if (error) {
    return (
      <>
        <Header token={token} />
        <div style={{ height: "100vh" }}>
          <Error title="An error occurred!" message={error.message} />;
        </div>
        <Footer />
      </>
    );
  }

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
