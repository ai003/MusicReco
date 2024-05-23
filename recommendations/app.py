from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from recommendation import load_and_prepare, get_recommendations, get_random_songs

app = Flask(__name__)
# Enable CORS with any origin
CORS(app)

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the path to the CSV file
csv_path = os.path.join(current_dir, '..', 'dataprocessing', 'cleaned.csv')

# Load your dataset
df, features = load_and_prepare(csv_path)

# Root endpoint to verify server is working


@app.route('/', methods=['GET'])
def home():
    return "Server is running"

# Endpoint to get random songs


@app.route('/random_songs', methods=['GET'])
def random_songs():
    random_songs = get_random_songs(df)
    response = jsonify(random_songs)
    print(response.headers)  # Debugging CORS headers
    return response

# Endpoint to get recommendations based on selected songs


@app.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.json
    selected_songs = data['songs']
    reco_list = get_recommendations(selected_songs, df, features)
    response = jsonify(reco_list)
    print(response.headers)  # Debugging CORS headers
    return response


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
