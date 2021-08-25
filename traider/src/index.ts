import * as Broker from './infra/broker'
Broker.Events.on("traider.send", { timeout: 500 })
