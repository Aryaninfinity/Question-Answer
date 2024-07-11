// RewardSystem.js

const POINTS_FOR_ANSWER = 5;
const POINTS_FOR_UPVOTES = 5;

export function awardPointsForAnswer(userId) {
  // Update user's points in the database
  updateUserPoints(userId, POINTS_FOR_ANSWER);
}

export function awardPointsForUpvotes(userId, upvoteCount) {
  if (upvoteCount === 5) {
    updateUserPoints(userId, POINTS_FOR_UPVOTES);
  }
}

export async function transferPoints(fromUserId, toUserId, points) {
  const fromUser = await getUserById(fromUserId);
  if (fromUser.points < 10 || fromUser.points < points) {
    throw new Error("Insufficient points to transfer");
  }
  
  await updateUserPoints(fromUserId, -points);
  await updateUserPoints(toUserId, points);
}

// UserProfile.jsx

import React, { useState, useEffect } from 'react';
import { transferPoints } from './RewardSystem';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [transferAmount, setTransferAmount] = useState(0);
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    fetchUserData(userId).then(setUser);
  }, [userId]);

  const handleTransfer = async () => {
    try {
      await transferPoints(userId, recipientId, transferAmount);
      // Refresh user data
      const updatedUser = await fetchUserData(userId);
      setUser(updatedUser);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Points: {user.points}</p>
      <div>
        <input
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(Number(e.target.value))}
          placeholder="Amount to transfer"
        />
        <input
          type="text"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="Recipient User ID"
        />
        <button onClick={handleTransfer}>Transfer Points</button>
      </div>
    </div>
  );
}
