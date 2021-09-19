import { Broker } from "./Broker"

export class Events {
	static on(topic: string): Function {
		return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
			Broker.subscribe(topic, descriptor.value)
		}
	}
}
