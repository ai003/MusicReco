from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from recommendation import load_and_prepare, get_recommendations, get_random_songs
