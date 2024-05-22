import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler


#
def load_and_prepare(cleaned_csv):
    df = pd.read_csv(cleaned_csv)

    # selected features for similarity
    features = ['danceability', 'energy', 'loudness', 'speechiness',
                'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

    # Normalize the feature columns
    scaler = StandardScaler()
    df[features] = scaler.fit_transform(df[features])

    return df, features


def get_random_songs(df, n_songs=25):
    # returns a datafram containing the sampled rows
    # orient data in dictionary json format
    return df.sample(n=n_songs)[['track_name', 'artists', 'album_name']].to_dict(orient='records')


def get_recommendations(selected_songs, df, features, n_recommendations=15):
    # ensure selected songs are in dataset
    selected_features = df[df['track_name'].isin(selected_songs)][features]
    if not selected_songs:
        raise ValueError("None of the selected songs are in the dataset")

    all_features = df[features]
    similarity_matrix = cosine_similarity(selected_features, all_features)

    # get average similarity score for each song
    mean_similarity = np.mean(similarity_matrix, axis=0)

    # get top n recommendations, excluding the selected songs
    recommend_indices = np.argsort(mean_similarity)[::-1]
    recommend_indices = [
        i for i in recommend_indices if df.iloc[i]['track_name'] not in selected_songs]
    # alternative to
    '''
    new indices = []
    for i in recommend_indices:
        if df.iloc[i]['track_name'] not in selected_songs:
            new_indices.append(i)
    '''

    # get the top 15 recommendations
    top_indices = recommend_indices[:n_recommendations]
    recommendations = df.iloc[top_indices]
    # orient data in dictionary json format
    return recommendations[['track_name', 'artist', 'album']].to_dict(orient='records')


# if __name__ == "__main__":
#     df, features = load_and_prepare('../dataprocessing/cleaned.csv')

#     # get a randeom pool of 25 songs
#     random_songs = get_random_songs(df)
#     print("Randonly selected songs for user selection:")
#     print(random_songs)

#     # select random 5 songs from pool
#     selected_songs = random_songs.sample(n=5)['track_name'].tolist()
#     print(f"selected songs: {selected_songs}")

#     recommendations = get_recommendations(selected_songs, df, features)
#     print("recommended songs")
#     print(recommendations[['track_name', 'artists', 'album_name']])
