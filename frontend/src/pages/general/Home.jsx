import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/reels.css';
import ReelFeed from '../../components/ReelFeed';

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    async function fetchVideos() {
        try {
            const response = await axios.get("http://localhost:3000/api/food", {
                withCredentials: true,
            });
            console.log("📥 Videos loaded with status:", response.data.foodItems);
            setVideos(response.data.foodItems);
            setIsAuthenticated(true);
        } catch (error) {
            if (error.response?.status === 401) {
                setIsAuthenticated(false);
            } else {
                console.error("Error fetching videos:", error);
            }
        } finally {
            setLoading(false);
        }
    }

    fetchVideos();
}, []);


    async function likeVideo(item) {
    try {
        console.log("🟢 LIKE CLICK - Current item state:", {
            id: item._id,
            currentLikeCount: item.likeCount,
            hasIsLikedField: 'isLiked' in item
        });

        const response = await axios.post(
            "http://localhost:3000/api/food/like",
            { foodId: item._id },
            { withCredentials: true }
        );

        console.log("🟡 BACKEND RESPONSE:", response.data);

        const isNowLiked = response.data.isLiked;
        console.log("🟡 isNowLiked from backend:", isNowLiked);

        setVideos((prev) => {
            const updated = prev.map((v) => {
                if (v._id === item._id) {
                    const newCount = isNowLiked
                        ? (v.likeCount || 0) + 1
                        : Math.max((v.likeCount || 0) - 1, 0);
                    
                    console.log("🟡 STATE UPDATE:", {
                        oldCount: v.likeCount,
                        newCount: newCount,
                        isNowLiked: isNowLiked
                    });

                    return {
                        ...v,
                        likeCount: newCount
                    };
                }
                return v;
            });
            return updated;
        });

        console.log(isNowLiked ? "✅ Video Liked!" : "❌ Video Unliked!");
    } catch (error) {
        console.error("❌ Error liking video:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        if (error.response?.status === 401) {
            setIsAuthenticated(false);
        }
    }
}


async function saveVideo(item) {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/food/save",
            { foodId: item._id },
            { withCredentials: true }
        );

        if (response.data.message === "Food saved successfully") {
            setVideos((prev) =>
                prev.map((v) =>
                    v._id === item._id 
                        ? { ...v, savesCount: (v.savesCount || 0) + 1 }  // ← Handle undefined
                        : v
                )
            );
        } else if (response.data.message === "Food unsaved successfully") {
            setVideos((prev) =>
                prev.map((v) =>
                    v._id === item._id 
                        ? { ...v, savesCount: Math.max((v.savesCount || 0) - 1, 0) }  // ← Handle undefined
                        : v
                )
            );
        }
    } catch (error) {
        console.error("Error saving video:", error);
        if (error.response?.status === 401) {
            setIsAuthenticated(false);
        }
    }
}


    if (loading) {
        return <p className="text-center mt-8 text-gray-500">Loading...</p>;
    }

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
