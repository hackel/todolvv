import { Temporal } from '@js-temporal/polyfill';

export default class Entry {
    uuid: string;
    text: string;
    completed_at: Temporal.Instant | null;
    private _expires_at: Temporal.Instant | null;
    updated_at: Temporal.Instant;
    created_at: Temporal.Instant;

    static new(args: Object = {}): Entry {
        return Object.assign(new Entry(), {
            text: '',
            ...args,
        });
    }

    static collection(entries: []): Entry[] {
        return entries.map(v => Entry.new(v));
    }

    static from(args: Object): Entry {
        return Entry.new(args);
    }

    clone(): Entry {
        return Entry.new(this);
    }

    complete(): this {
        this.completed_at = Temporal.Now.instant();

        return this;
    }

    get expires_at(): Temporal.Instant | null {
        return this._expires_at;
    }

    set expires_at(date: string | Temporal.Instant | null) {
        if (typeof date === 'string') {
            date = Temporal.Instant.from(date);
        }

        this._expires_at = date;
    }

    incomplete(): this {
        this.completed_at = null;

        return this;
    }

    isComplete(): boolean {
        return this.completed_at != null;
    }

    toJSON() {
        return {
            uuid: this.uuid,
            text: this.text,
            completed_at: this.completed_at,
            expires_at: this.expires_at,
        };
    }
}
