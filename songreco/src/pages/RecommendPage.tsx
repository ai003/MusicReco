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
    const [title, setTitle] = useState("Select Your Top 5 Songs"); //for title
    const [clicked, setClicked] = useState(false); //for button


    //side effect such as data fetching which will change the DOM
    useEffect(() => {
        fetch('http://127.0.0.1:5000/random_songs')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                console.log('Fetched songs:', data); // Log fetched data
                setSongs(data);
            })
            .catch(error => console.error('Error fetching random songs:', error)); // Error check
    }, []);

    //Handle song selection
    const handleSongSelect = (song: Song) => {
        const isSelected = selectedSongs.includes(song); //boolean to check if song is selected
        if (isSelected) {//if already selected this deselects
            setSelectedSongs(selectedSongs.filter(s => s !== song)); // iterate through list to remove
        } else if (selectedSongs.length < 5) {//if not add to array
            setSelectedSongs([...selectedSongs, song]);//update selected songs with song
        }
    };

    //handle getting recommendations
    const handleGetRecommendations = () => {
        setLoading(true) //for spinner
        setTitle("Getting Your Recommendations...");
        fetch('http://127.0.0.1:5000/recommendations', {//initiates fetch request endpoint server
            method: 'POST',

            headers: { //indicates that the requestion is json data
                'Content-Type': 'application/json',
            },
            //request body
            //converts array of selected songs intro a json string with only song names
            body: JSON.stringify({ songs: selectedSongs.map(song => song.track_name) }),
        })
            .then(response => response.json()) //parses response into compatable form
            .then(data => {
                setRecommendations(data); //Update the recommendations state with fetched data(use later)
                setTitle("Here is Your Playlist!");
                setClicked(true);
                setLoading(false); //set the loading state to false after fetching data
            })
            .catch(error => {
                console.error('Error fetching recommendations', error); //logs any errors during fetch
                setLoading(false) //set the loading state to false
            });


    };

    return (
        <div className='recommend-page'>
            <h1>{title}</h1>
            {!loading && !clicked && (
                <SongList
                    songs={songs}
                    selectedSongs={selectedSongs}
                    onSongSelect={handleSongSelect}
                />
            )}
            {loading && <LoadingSpinner />} {/*loading boolean only show spinner if T*/}
            {!clicked && songs.length > 0 && !loading && (
                <button onClick={handleGetRecommendations} disabled={selectedSongs.length !== 5}>
                    Get Recommendations
                </button>
            )}
            {recommendations.length > 0 && (
                <SongList
                    songs={recommendations}
                    isRecommendation={true}
                />
            )} {/* passes code to songlist for resuability */}
        </div>
    );
};

export default RecommendPage;
