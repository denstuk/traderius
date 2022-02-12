import {Broker, Subscription} from "../Broker"

export class Events {
	static on(sub: Subscription): Function {
		return async (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
			await Broker.subscribe(sub, descriptor.value)
		}
	}
}
