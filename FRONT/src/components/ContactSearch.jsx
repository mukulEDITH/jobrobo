import React, { useState } from "react";
import axios from "axios";


function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSearch = async () => {
    try {
      if (!phoneNumber) {
        setError("Please enter a mobile number");
        setUser([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/contacts/${phoneNumber}`
      );

      setUser(response.data);
      setError(null);
    } catch (error) {
      setError("Could not fetch user");
      setUser([]);
    }
  };

  return (
    <div>
      <h1>User Search</h1>
      <input
        type="text"
        placeholder="Enter mobile number"
        value={phoneNumber}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>}
      {user.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNumber</th>
            </tr>
          </thead>
          <tbody>
            {user.map((userData) => (
              <tr key={userData._id}>
                <td>{userData.name}</td>
                <td>{userData.email}</td>
                <td>{userData.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Search;
