// ForgotPassword.jsx

import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send password reset email
    await sendPasswordResetEmail(email);
    setResetSent(true);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!resetSent ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <p>Password reset instructions have been sent to your email.</p>
      )}
    </div>
  );
}

// ResetPassword.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Reset password
    await resetPassword(token, newPassword);
    // Redirect to login page
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
