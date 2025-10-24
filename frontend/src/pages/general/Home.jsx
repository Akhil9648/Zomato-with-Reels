import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/reels.css';
import ReelFeed from '../../components/ReelFeed';

// Read base URL from Vite env
const API_BASE = import.meta.env.VITE_API_URL;

// Configure axios once for this module
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true
});

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await api.get('/food/');
        console.log('📥 Videos loaded:', response.data.foodItems);
        setVideos(response.data.foodItems);
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response?.status === 401) setIsAuthenticated(false);
        else console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  async function likeVideo(item) {
    try {
      const response = await api.post('/food/like', { foodId: item._id });

      // Expect backend to return both count and flag
      const { action, likeCount, isLiked } = response.data;

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id ? { ...v, likeCount, isLiked } : v
        )
      );

      console.log(action === 'liked' ? '✅ Video Liked!' : '❌ Video Unliked!');
    } catch (error) {
      console.error('❌ Error liking video:', error);
      if (error.response?.status === 401) setIsAuthenticated(false);
    }
  }

  async function saveVideo(item) {
    try {
      const response = await api.post('/food/save', { foodId: item._id });

      // Expect backend to return both count and flag
      const { action, savesCount, isSaved } = response.data;

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id ? { ...v, savesCount, isSaved } : v
        )
      );

      console.log(action === 'saved' ? '✅ Video Saved!' : '❌ Video Unsaved!');
    } catch (error) {
      console.error('❌ Error saving video:', error);
      if (error.response?.status === 401) setIsAuthenticated(false);
    }
  }

  if (loading) return <p className="text-center mt-8 text-gray-500">Loading...</p>;

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Please login to continue
        </h2>
        <a
          href="/user/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
