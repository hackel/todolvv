export default abstract class Model {
    static collection<T = Model>(
        this: { new (): T },
        entries: Array<Record<string, unknown>>,
    ): T[] {
        return entries.map(v =>
            Object.assign(new this(), {
                ...v,
            }),
        );
    }

    static from<T = Model>(this: { new (): T }, args: Record<string, unknown> | T) {
        return Object.assign(new this(), {
            ...args,
        });
    }
}
