import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/RecommendPage.css';

//song object
interface Song {
    track_name: string;
    artists: string;
    album_name: string;
}

const RecommendPage: React.FC = () => {
    //holds current object and what needs to be updated
    const [songs, setSongs] = useState<Song[]>([]) //song state to hold array of song objects(init is empty)
    const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<Song[]>([]); //holds songs recom.. from backend


    //side effect such as data fetching which will change the DOM
    useEffect(() => {
        fetch('http://127.0.0.1:5000/random_songs')
            .then(response => response.json()).then(data => setSongs(data));
    }, []); //fetches data once

    return (
        <div>
            <h1>HI</h1>
        </div>
    )

};

export default RecommendPage;