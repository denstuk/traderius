# @traderius:internal

Services are needed to implement the internal logic of the system such as authorization, account management, analytics

## Service registry:

- [Hub](./hub): API Gateway

Language: TypeScript</br>
Framework: Nest.js</br>
HTTP port: 9801</br>

- [Predictor](./predictor): LSTM AI

Language: Python3</br>
Framework: FastAPI</br>
HTTP port: 9802</br>

- [Identity](./identity): OAuth JWT provider

Language: TypeScript</br>
Framework: Nest.js</br>
HTTP port: 9803</br>
