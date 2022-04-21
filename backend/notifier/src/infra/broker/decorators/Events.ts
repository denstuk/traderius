import {Broker, Subscription} from "../Broker";

type Decorator = (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => Promise<void>;

export class Events {
	static on(sub: Subscription): Decorator {
		return async (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
			await Broker.subscribe(sub, descriptor.value);
		};
	}
}
