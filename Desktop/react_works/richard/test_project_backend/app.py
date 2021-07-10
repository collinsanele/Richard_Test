from flask import Flask, jsonify
from flask_cors import CORS



app = Flask(__name__)
CORS(app)




@app.route('/')
def get_data():
    data = [1, 2, 3]
    return jsonify(data)




if __name__ == "__main__":
    app.run(debug=True)