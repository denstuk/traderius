import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def main():
    dataset = pd.read_csv("a.csv", usecols = ['Date', 'Close'])
    data = dataset.iloc[:, :].values
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, 1:].values

    arrX = []
    arrY = []

    for i in range(len(data)):
        arrX.append(i)
        print(data[i][1])
        arrY.append(data[i][1])

    plt.plot(arrX, arrY, color="red",)
    plt.grid()
    plt.title("Apple Stock Price")
    plt.xlabel("")
    plt.ylabel("")
    plt.show()

main()