import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })
    }, [])

    const removeSaved = async (item) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/food/save",
            { foodId: item._id },
            { withCredentials: true }
        );

        const isNowSaved = response.data.isSaved;

        setVideos((prev) =>
            prev.map((v) =>
                v._id === item._id
                    ? {
                        ...v,
                        savesCount: isNowSaved
                            ? (v.savesCount || 0) + 1
                            : Math.max((v.savesCount || 0) - 1, 0),
                        isSaved: isNowSaved
                    }
                    : v
            )
        );
    } catch (error) {
        console.error("Error saving video:", error);
    }
};


    return (
        <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
    )
}

export default Saved
