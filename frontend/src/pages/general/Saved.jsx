import React, { useEffect, useState } from 'react';
import '../../styles/reels.css';
import axios from 'axios';
import ReelFeed from '../../components/ReelFeed';

// Base URL from Vite env
const API_BASE = import.meta.env.VITE_API_URL;

// Axios instance with defaults
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true
});

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api
      .get('/food/save')
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
          isSaved: true // saved list always true initially
        }));
        setVideos(savedFoods);
      })
      .catch((err) => {
        console.error('Error loading saved videos:', err);
      });
  }, []);

  const removeSaved = async (item) => {
    try {
      const response = await api.post('/food/save', { foodId: item._id });

      const { isSaved, savesCount } = response.data; // backend should return both

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount: typeof savesCount === 'number'
                  ? savesCount
                  : isSaved
                  ? (v.savesCount || 0) + 1
                  : Math.max((v.savesCount || 0) - 1, 0),
                isSaved
              }
            : v
        )
      );
    } catch (error) {
      console.error('Error saving/unsaving video:', error);
    }
  };

  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;
