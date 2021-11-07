from keras.models import Sequential, model_from_json
from keras.layers import Dense, LSTM

class StockPricePredictor:
    model: Sequential = None

    @staticmethod
    def save_model():
        serialized_model = StockPricePredictor.model.to_json()
        with open("model.json", "w") as json_file:
            json_file.write(serialized_model)

        StockPricePredictor.model.save_weights("model.h5")
        print("Saved model to disk")

    @staticmethod
    def load_model():
        json_file = open('model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        StockPricePredictor.model = model_from_json(loaded_model_json)
        # load weights into new model
        StockPricePredictor.model.load_weights("model.h5")
        print("Loaded model from disk")

    @staticmethod
    def build(x_train, y_train):
        StockPricePredictor.model = Sequential()
        StockPricePredictor.model.add(LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
        StockPricePredictor.model.add(LSTM(50, return_sequences=False))
        StockPricePredictor.model.add(Dense(25))
        StockPricePredictor.model.add(Dense(1))
        StockPricePredictor.model.compile(optimizer='adam', loss='mean_squared_error')
        StockPricePredictor.model.fit(x_train, y_train, batch_size=1, epochs=1)

    def predict(x_test):
        return StockPricePredictor.model.predict(x_test)