import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  const deleteUsers = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mt-5">
      <Link to={"add"} className="button is-success">
        Add Users
      </Link>
      <div className="column is-multiline mt-2">
        {users.map((user) => (
          <div className="column is-one-quarter" key={user.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-square">
                  <img src={user.url} alt={user.image} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{user.name}</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link
                  to={`edit/${user.id}`}
                  className="card-footer-item button is-link is-outlined"
                >
                  Edit
                </Link>
                &nbsp;
                <a
                  onClick={() => deleteUsers(user.id)}
                  className="card-footer-item button is-danger is-outlined"
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
