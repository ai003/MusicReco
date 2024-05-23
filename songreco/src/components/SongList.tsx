import React from 'react';
import { Song } from '../pages/RecommendPage';

//object type that uses Song[] for reusability
interface SongListProps {
    songs: Song[]
    selectedSongs?: Song[] //all optional types
    onSongSelect?: (song: Song) => void;
    isRecommendation?: boolean
}

const SongList: React.FC<SongListProps> = ({ songs, selectedSongs = [], onSongSelect, isRecommendation = false }) => (
    <div className={`song-list ${isRecommendation ? 'recommendation-list' : ''}`}>
    {/*ensure type safety*/}
    {songs.map((song: Song, index: number) => (
        <div
            key={index}
            className={`song-tile ${selectedSongs.includes(song) ? 'selected' : ''}`}
            onClick={onSongSelect ? () => onSongSelect(song) : undefined}
        >
            <h3>{song.track_name}</h3>
            <p>{song.artists}</p>
            <p>{song.album_name}</p>
        </div>
    ))}
</div>
);

export default SongList;