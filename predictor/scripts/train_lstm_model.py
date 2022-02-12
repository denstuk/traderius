import math
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from lib.predictor import Predictor
import os


def train() -> None:
    current_path: str = os.path.dirname(__file__)
    path_to_data: str = os.sep.join([current_path, '..', 'static', 'MSFT.csv'])

    df = pd.read_csv(path_to_data)
    data = df.filter(["Close"])
    dataset = data.values
    training_data_len = math.ceil(len(dataset) * .8)  # training set length

    # scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)

    # training dataset creation
    train_data = scaled_data[0:training_data_len, :]
    x_train = []
    y_train = []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i - 60:i, 0])
        y_train.append(train_data[i, 0])

    # convert to np arrays
    x_train, y_train = np.array(x_train), np.array(y_train)
    # reshape the data
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    Predictor.build(x_train, y_train)
    Predictor.save_model()

    # creating the testing data set
    test_data = scaled_data[training_data_len - 60:, :]

    x_test = []
    y_test = dataset[training_data_len:, :]

    for i in range(60, len(test_data)):
        x_test.append(test_data[i - 60:i, 0])

    # convert the data
    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    # Get predicted values
    predictions = Predictor.predict(x_test)
    predictions = scaler.inverse_transform(predictions)

    # Get the root mean squared error (RMSE)
    rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))

    train = data[:training_data_len]
    valid = data[training_data_len:]
    valid['Predictions'] = predictions


train()
