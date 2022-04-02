/**
 * Find least in array of objects by numeric keys
 * @param items
 * @param keys
 */
export function findMinByField<T>(items: T[], keys: (keyof T)[]): number {
    let min = items[0][keys[0]];
    for (const item of items) {
        for (const key of keys) {
            if (!item[key]) continue;
            if (item[key] < min) min = item[key];
        }
    }
    return min as unknown as number;
}

/**
 * Find biggest in array of objects by numeric keys
 * @param items
 * @param keys
 */
export function findMaxByField<T>(items: T[], keys: (keyof T)[]): number {
    let max = items[0][keys[0]];
    for (const item of items) {
        for (const key of keys) {
            if (!item[key]) continue;
            if (item[key] > max) max = item[key];
        }
    }
    return max as unknown as number;
}