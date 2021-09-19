import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

def prepareData(dataset):
    data = []

    row = []
    for i in range(len(dataset)):
        row.append(dataset[i][1])
        if (i % 7 == 0 and i != 0):
            if (len(row) == 7):
                data.append(row)
            row = []

    return data

def main():
    dataset = pd.read_csv("a.csv", usecols = ['Date', 'Close'])
    data = dataset.iloc[:, :].values

    prepared = prepareData(data)
    preparedDataset = pd.DataFrame(prepared)

    X = preparedDataset.iloc[:, :-1].values
    y = preparedDataset.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    print(len(X))
    print(len(y))

    y_pred = regressor.predict(X_test)

    plt.scatter(X_train, y_train, color="red", s=2)
    plt.grid()
    #plt.scatter(X_train, regressor.predict(X_train), color="blue", s=3)
    plt.show()

main()