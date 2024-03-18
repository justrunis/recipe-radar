import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { variables } from "../Variables";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePatchRequest,
} from "../Helpers/databaseRequests";
import { useState } from "react";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  Table,
  TableRow,
  Paper,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useFetch } from "../Hooks/useFetch";
import Error from "../Components/Error";
import UserModal from "./UserModal";
import { toast } from "react-toastify";

async function fetchAllUsers() {
  const users = await makeGetRequest(variables.API_URL + "getAllUsers");
  return new Promise((resolve) => {
    resolve(users);
  });
}

export default function Users({ token }) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser);
  const [editMode, setEditMode] = useState(false);

  const {
    isFetching,
    fetchedData: users,
    setFetchedData: setUsers,
    error,
  } = useFetch(fetchAllUsers, []);

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

  function handleUserEdit(user) {
    setSelectedUser(user);
    setEditMode(true);
  }

  function handleRemoveUser(user) {
    const URL = variables.API_URL + "deleteUser/" + user.id;
    const response = makeDeleteRequest(URL);
    response.then((data) => {
      if (data) {
        const newUsers = users.filter((u) => u.id !== user.id);
        setUsers(newUsers);
      }
    });
  }

  function openConfirmDialog(user) {
    setSelectedUser(user);
    setConfirmDialogOpen(true);
  }

  function closeConfirmDialog() {
    setSelectedUser(null);
    setConfirmDialogOpen(false);
  }

  function confirmRemoveUser() {
    if (selectedUser) {
      handleRemoveUser(selectedUser);
      closeConfirmDialog();
    }
  }

  function handleClose() {
    setEditMode(false);
    setSelectedUser(null);
  }

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function makeUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function handleSaveChanges(editedUser) {
    setEditMode(false);
    setSelectedUser(editedUser);
    setUsers((prevUsers) => {
      const index = prevUsers.findIndex((u) => u.id === editedUser.id);
      const newUsers = [...prevUsers];
      newUsers[index] = editedUser;
      return newUsers;
    });

    const URL = variables.API_URL + "updateUser/" + editedUser.id;
    const response = await makePatchRequest(URL, editedUser);
    if (response) {
      toast.success(`User ${editedUser.username} updated successfully!`);
    } else {
      toast.error("Failed to update user!");
    }
  }

  return (
    <>
      <Header token={token} />
      <div className="users-container">
        <div className="users-table-container">
          <h1>Users</h1>
          {isFetching && <p>Loading...</p>}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Created At</TableCell>
                  <TableCell align="left">Updated At</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.username}
                    </TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">
                      {makeUppercase(user.role)}
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(user.created_at)}
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(user.updated_at)}
                    </TableCell>
                    <TableCell align="left">
                      <button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="submit-button mx-1 my-1"
                        onClick={() => handleUserEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="remove-button mx-1 my-1"
                        onClick={() => openConfirmDialog(user)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />

      <Dialog open={confirmDialogOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete
          {selectedUser && (
            <span style={{ color: red[500] }}> {selectedUser.username} </span>
          )}
          user?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog}>Cancel</Button>
          <Button
            onClick={confirmRemoveUser}
            autoFocus
            style={{ color: red[500] }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {selectedUser && (
        <UserModal
          editedUser={selectedUser}
          setEditedUser={setSelectedUser}
          show={editMode}
          handleClose={handleClose}
          onSaveChanges={handleSaveChanges}
        />
      )}
    </>
  );
}
