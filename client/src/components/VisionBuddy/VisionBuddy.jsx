import React, { useState } from "react";
import { useToken } from "../../context/TokenContext";
import "./VisionBuddy.css";
import { FaTrash, FaSearch } from "react-icons/fa";

const VisionBuddy = () => {
  const { tokenContext } = useToken(); // Access the user's login status
  const [following, setFollowing] = useState([
    { name: "username1", following: true },
    { name: "username2", following: false },
    { name: "username3", following: true },
  ]); // Initial data
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { name: "username1 sent you a buddy request" },
    { name: "username2 sent you a buddy request" },
    { name: "username3 sent you a buddy request" },
  ]); // Initial notifications
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const allUsers = [
    { name: "username1" },
    { name: "username2" },
    { name: "username3" },
    { name: "username4" },
    { name: "username5" },
  ];

  // Toggle visibility of the dropdown
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Search Filter
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Clear All Notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Add or Remove a user from the following list
  const toggleFollow = (userName) => {
    const updatedFollowing = [...following];
    const userIndex = updatedFollowing.findIndex((user) => user.name === userName);

    if (userIndex !== -1) {
      updatedFollowing[userIndex].following = !updatedFollowing[userIndex].following;
    } else {
      updatedFollowing.push({ name: userName, following: true });
    }

    setFollowing(updatedFollowing);
  };

  // Filter following users based on search query
  const filteredFollowing = following.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  // Filter all users based on search query
  const filteredAllUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery)
  );

  // If user is not logged in
  if (!tokenContext) {
    return (
      <div className="vision-buddy-login-container">
        <h1 className="vision-buddy-login-title">
          Want to enjoy VisionScape to the fullest? Sign Up for FREE today!
        </h1>
        <div className="vision-buddy-login-buttons">
          <button className="vision-buddy-login-button google">
            Sign up with Google
          </button>
          <button className="vision-buddy-login-button email">
            Sign up with Email
          </button>
        </div>
        <p className="vision-buddy-login-text">
          Already signed up? <a href="/login">Log In</a>
        </p>
      </div>
    );
  }

  // Main content for logged-in users
  return (
    <div className="vision-buddy-main-container">
      <div className="vision-buddy-left-section">
        <header className="vision-buddy-user-header">
          <h1>Hello, username</h1>
          <img
            className="vision-buddy-profile-pic"
            src="https://via.placeholder.com/50"
            alt="Profile"
          />
        </header>

        <div className="vision-buddy-search-container">
          <div className="vision-buddy-search-bar" onClick={toggleDropdown}>
            <FaSearch className="vision-buddy-search-icon" />
            <input
              type="text"
              className="vision-buddy-search-input"
              placeholder="Search Vision Buddies"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {dropdownVisible && (
            <div className="vision-buddy-dropdown">
              {filteredAllUsers.length > 0 ? (
                filteredAllUsers.map((user, index) => {
                  const isFollowing = following.some(
                    (follower) => follower.name === user.name && follower.following
                  );
                  return (
                    <div key={index} className="vision-buddy-dropdown-item">
                      <span>{user.name}</span>
                      <button
                        className={`vision-buddy-button ${
                          isFollowing ? "remove" : "add"
                        }`}
                        onClick={() => toggleFollow(user.name)}
                      >
                        {isFollowing ? "Remove" : "Add"}
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="vision-buddy-right-section">
        <div className="vision-buddy-white-box">
          <h2>Vision Buddies</h2>
          <div className="vision-buddy-section">
            <h3>Following</h3>
            {following.length > 0 ? (
              following.map((user, index) =>
                user.following && (
                  <div key={index} className="vision-buddy-row">
                    <img
                      className="vision-buddy-avatar"
                      src="https://via.placeholder.com/34"
                      alt="Buddy"
                    />
                    <span className="vision-buddy-name">{user.name}</span>
                    <button
                      className="vision-buddy-button remove"
                      onClick={() => toggleFollow(user.name)}
                    >
                      Remove
                    </button>
                  </div>
                )
              )
            ) : (
              <p>No results found.</p>
            )}
          </div>

          <div className="vision-buddy-divider"></div>

          <div className="vision-buddy-section">
            <div className="vision-buddy-notifications-header">
              <h2 className="vision-buddy-section-title">Notifications</h2>
              <button
                className="vision-buddy-clear-button"
                onClick={clearNotifications}
              >
                <FaTrash className="vision-buddy-trash-icon" /> Clear all
              </button>
            </div>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="vision-buddy-row">
                  <img
                    className="vision-buddy-avatar"
                    src="https://via.placeholder.com/34"
                    alt="Notification"
                  />
                  <span className="vision-buddy-name">{notification.name}</span>
                </div>
              ))
            ) : (
              <p>No notifications.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBuddy;
