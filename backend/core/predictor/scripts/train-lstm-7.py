import math
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from lib.lstm import Lstm
import os


def main() -> None:
    current_path: str = os.path.dirname(__file__)
    path_to_data: str = os.sep.join([current_path, '..', 'static', 'AAPL.csv'])

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

    for i in range(7, len(train_data)):
        x_train.append(train_data[i - 7:i, 0])
        y_train.append(train_data[i, 0])

    # convert to np arrays
    x_train, y_train = np.array(x_train), np.array(y_train)
    # reshape the data
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    lstm = Lstm("lstm7", 7)
    lstm.build(x_train, y_train)
    lstm.save_model()


main()
