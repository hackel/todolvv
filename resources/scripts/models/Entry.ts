import { Temporal } from '@js-temporal/polyfill';

export default class Entry {
    uuid: string;
    text: string;
    completed_at: Temporal.Instant | null;
    expires_at: Temporal.Instant | null;
    updated_at: Temporal.Instant;
    created_at: Temporal.Instant;

    static new(args: Object = {}): Entry {
        return Object.assign(new Entry(), {
            ...args,
        });
    }

    static collection(entries: []) {
        return entries.map(v => Entry.new(v));
    }

    clone(): Entry {
        return Entry.new(this);
    }

    complete(): this {
        this.completed_at = Temporal.Now.instant();

        return this;
    }

    incomplete(): this {
        this.completed_at = null;

        return this;
    }

    isComplete(): boolean {
        return this.completed_at != null;
    }
}
