// PublicSpace.jsx

import React, { useState, useEffect } from 'react';

function PublicSpace({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Fetch posts from the server
    const fetchedPosts = await fetchPostsFromServer();
    setPosts(fetchedPosts);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (canUserPost(user)) {
      await createPost(user.id, newPost);
      setNewPost('');
      fetchPosts();
    } else {
      alert("You've reached your daily post limit or don't have enough friends.");
    }
  };

  return (
    <div>
      <h1>Public Space</h1>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function PostItem({ post }) {
  return (
    <div>
      <p>{post.content}</p>
      <button onClick={() => handleLike(post.id)}>Like</button>
      <button onClick={() => handleComment(post.id)}>Comment</button>
      <button onClick={() => handleShare(post.id)}>Share</button>
    </div>
  );
}

function canUserPost(user) {
  const currentDate = new Date().toDateString();
  const postsToday = user.posts.filter(post => new Date(post.createdAt).toDateString() === currentDate).length;
  
  if (user.friends.length >= 10) return true;
  if (user.friends.length >= 2 && postsToday < 2) return true;
  if (user.friends.length > 0 && postsToday < 1) return true;
  return false;
}

export default PublicSpace;
