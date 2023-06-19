export function assertIsDefined<T>(value: T | undefined): T {
    if (value === undefined) {
        throw new Error("value is not defined");
    }
    return value;
}
