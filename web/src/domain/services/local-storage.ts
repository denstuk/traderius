export class LocalStorage {
    static setObject<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getObject<T>(key: string): T | undefined {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : undefined;
    }

    static set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    static get(key: string): string | undefined {
        const value = localStorage.getItem(key);
        return value ? value : undefined;
    }

    static remove(key: string): void {
        localStorage.removeItem(key);
    }
}
