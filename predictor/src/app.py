from flask import Flask

app = Flask(__name__)


@app.route("/", methods=['GET'])
def health_check():
    return {"status": "Ok"}, 200
