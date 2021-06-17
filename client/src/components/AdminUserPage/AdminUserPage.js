import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import { getUsers, disableUser } from "../../api/auth";
import styles from "./AdminUserPage.module.css";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onDisableUser = async (uuid) => {
    const response = await disableUser(uuid);
    if (response.status === 200) {
      setMessage("User disabled successfully");
      setError(null);
      setUsers(users.filter((user) => user.uuid !== uuid));
    } else {
      setMessage(null);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers({ filter: { disabled: 0 } });
      setUsers(data.data.data);
    };

    fetchUsers();
  }, []);
  return (
    <div className="p-5">
      <h1> Users: </h1>
      {message && <p className={styles.infoMessage}> {message} </p>}
      {error && <p className={styles.errorMessage}> {error} </p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> Uuid </th>
            <th> Username </th>
            <th> Email </th>
            <th> Disable </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.uuid}>
                  <td>{user.uuid}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        onDisableUser(user.uuid);
                      }}
                    >
                      <ClearIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminUserPage;
