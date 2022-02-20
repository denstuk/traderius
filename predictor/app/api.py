from fastapi import FastAPI
from pydantic import BaseModel
from lib.lstm import Lstm

lstm30 = Lstm("lstm30", 30)
lstm7 = Lstm("lstm7", 7)

lstm30.load_model()
lstm7.load_model()

app = FastAPI()


class PredictRequestBody(BaseModel):
    values: list


@app.post("/predict")
async def predict(body: PredictRequestBody):
    return {"prediction": {"lstm30": lstm30.predict(body.values), "lstm7": lstm7.predict(body.values)}}
