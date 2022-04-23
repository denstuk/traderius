export class MessagePayload<T> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  value: T;
  headers: Record<string, any>;
}
