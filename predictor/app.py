from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def health():
    return {}, 200


@app.route('/predict', methods=['POST'])
def predict_lstm():
    points = request.form["data"]
    return {}, 200


if __name__ == '__main__':
    app.run()
