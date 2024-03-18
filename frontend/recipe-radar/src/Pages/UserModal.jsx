import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Assuming you're using Bootstrap for styling

export default function UserModal({
  show,
  handleClose,
  editedUser,
  setEditedUser,
  onSaveChanges,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [changedUser, setChangedUser] = useState({
    username: editedUser.username,
    email: editedUser.email,
    role: editedUser.role,
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={editedUser.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => onSaveChanges(editedUser)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
