// notifications.js

function checkNotificationPermission() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }
  
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        }
      });
    }
  }
  
  function showNotification(title, options) {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    }
  }
  
  function notifyAnswer(questionTitle) {
    showNotification("New Answer", {
      body: `Someone answered your question: ${questionTitle}`,
      icon: "/path/to/icon.png",
      badge: "/path/to/badge.png",
      backgroundColor: "green"
    });
  }
  
  function notifyUpvote(contentType, title) {
    showNotification("Upvote Received", {
      body: `Your ${contentType} was upvoted: ${title}`,
      icon: "/path/to/icon.png",
      badge: "/path/to/badge.png",
      backgroundColor: "yellow"
    });
  }
  
  export { checkNotificationPermission, notifyAnswer, notifyUpvote };
  // ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import { checkNotificationPermission } from './notifications';

function ProfilePage({ user }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(user.notificationsEnabled);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const handleToggleNotifications = async () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    
    // Update user preferences in the database
    await updateUserPreferences(user.id, { notificationsEnabled: newState });
  };

  return (
    <div>
      <h1>User Profile</h1>
      {/* Other profile information */}
      <div>
        <label>
          Enable Notifications:
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggleNotifications}
          />
        </label>
      </div>
    </div>
  );
}

export default ProfilePage;
