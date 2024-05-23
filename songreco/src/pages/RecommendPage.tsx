import React from 'react';
import { useState, useEffect } from 'react'; //update UI effectively
import '../styles/RecommendPage.css';
import LoadingSpinner from '../components/LoadingSpinner';
import SongList from '../components/SongList';

//song object
export interface Song { //export it to use in another file/component
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
            .then(response => response.json()).then(data => setSongs(data)); //converts respons to json tht can be used
    }, []); //fetches data only once since no dependencies

    //Handle song selection
    const handleSongSelect = (song: Song) => {
        const isSelected = selectedSongs.includes(song); //boolean to check if song is selected
        if (isSelected) {//if already selected this deselects
            setSelectedSongs(selectedSongs.filter(s => s !== song)) // iterate through list to remove
        } else if (selectedSongs.length < 5) {//if not add to array
            setSelectedSongs([...selectedSongs, song]);//update selected songs with song
        }
    };
    
    //handle getting recommendations
    const handleGetRecommendations = () => {
        setLoading(true) //for spinner
        fetch('http://127.0.0.1:5000/recommendations', {//initiates fetch request endpoint server
            method: 'POST',

            headers: { //indicates that the requestion is json data
                'Content-Type': 'applications/json',
            },
            //request body
            //converts array of selected songs intro a json string with only song names
            body: JSON.stringify({ songs: selectedSongs.map(song => song.track_name)}),
        })
        .then(response => response.json()) //parses response into compatable form
        .then(data => {
            setRecommendations(data); //Update the recommendations state with fetched data(use later)
            setLoading(false); //set the loading state to false after fetching data
        })
        .catch(error => {
            console.error('Error fetching recommendations', error); //logs any errors during fetch
            setLoading(false) //set the loading state to false
        });


    };

    return (
        <div className='recommend-page'>
            <h1>Select Songs</h1>
            <SongList
                songs={songs}
                selectedSongs={selectedSongs}
                onSongSelect={handleSongSelect}
            />
            <button onClick={handleGetRecommendations} disabled={selectedSongs.length !== 5}>
                Get Recommendations
            </button>
            {loading && <LoadingSpinner/>} {/*loading boolean only show spinner if T*/}
            {recommendations.length > 0 && (
                <SongList
                    songs = {recommendations}
                    isRecommendation = {true}
                />
            )} {/* passes code to songlist for resuability */}   
        </div>
    );  
};

export default RecommendPage;
