from flask import Flask, request, jsonify
# from flask_cors import CORS
import pandas as pd
from recommendation import load_and_prepare, get_recommendations, get_random_songs
import os

app = Flask(__name__)

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the CSV file
csv_path = os.path.join(current_dir, '..', 'dataprocessing', 'cleaned.csv')

# Load your dataset from imported method
df, features = load_and_prepare(csv_path)


# Root endpoint to verify server is working
@app.route('/', methods=['GET'])
def home():
    return "Server is running"

#endpoint to get random songs from python
@app.route('/random_songs', methods=['GET'])
def random_songs():
    random_songs = get_random_songs(df)
    return jsonify(random_songs)

# endpoint to get recommendations based on selected songs
@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.json
    selected_songs = data['songs']
    reco_list = get_recommendations(selected_songs, df, features)
    return jsonify(reco_list)




if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
