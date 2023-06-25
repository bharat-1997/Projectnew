import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = data.data.map((user, index) => ({
          ...user,
          id: index + 1
        }));
        setUsers(updatedUsers);
      })
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <p>ID: {user.id}</p>
            <img src={user.avatar} alt="User Avatar" />
            <p>First Name: {user.first_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
