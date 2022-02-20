from keras.models import Sequential, model_from_json
from keras.layers import Dense, LSTM
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np
import os


class Lstm:
    model: Sequential = None
    lstm_type: str
    lstm_days: int

    def __init__(self, lstm_type: str, lstm_days: int):
        self.lstm_type = lstm_type
        self.lstm_days = lstm_days

    def __get_model_directory(self) -> str:
        current_path: str = os.path.dirname(__file__)
        return os.sep.join([current_path, '..', 'models', self.lstm_type])

    def save_model(self):
        model_path: str = os.sep.join([self.__get_model_directory(), 'model.json'])
        weights_path: str = os.sep.join([self.__get_model_directory(), 'model.h5'])

        serialized_model = self.model.to_json()
        with open(model_path, "w") as json_file:
            json_file.write(serialized_model)

        self.model.save_weights(weights_path)
        print("Saved model to disk")

    def load_model(self):
        model_path: str = os.sep.join([self.__get_model_directory(), 'model.json'])
        weights_path: str = os.sep.join([self.__get_model_directory(), 'model.h5'])

        json_file = open(model_path, 'r')
        loaded_model_json = json_file.read()
        json_file.close()

        self.model = model_from_json(loaded_model_json)
        self.model.load_weights(weights_path)
        print("Loaded model from disk")

    def build(self, x_train, y_train):
        self.model = Sequential()
        self.model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
        self.model.add(LSTM(50, return_sequences=False))
        self.model.add(Dense(25))
        self.model.add(Dense(1))
        self.model.compile(optimizer='adam', loss='mean_squared_error')
        self.model.fit(x_train, y_train, batch_size=1, epochs=1)

    def predict_simple(self, x_values):
        return self.model.predict(x_values)

    def predict(self, prices: list) -> float:
        df = pd.DataFrame(prices)
        dataset = df[-self.lstm_days:].values

        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(dataset)

        X_test = []
        X_test.append(scaled_data)
        X_test = np.array(X_test)
        X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

        prediction = self.predict_simple(X_test)
        prediction_price = scaler.inverse_transform(prediction)

        return float(prediction_price[0][0])
