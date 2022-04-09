import { Temporal } from '@js-temporal/polyfill';
import Model from '@scripts/models/Model';

export default class Entry extends Model {
    uuid: string;
    text = '';
    completed_at: Temporal.Instant | null;
    private _expires_at: Temporal.Instant | null = null;
    updated_at: Temporal.Instant;
    created_at: Temporal.Instant;

    clone(): Entry {
        return Entry.from(this);
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

    isExpired(): boolean {
        if (this.expires_at === null) {
            return false;
        }

        return Temporal.Instant.compare(this.expires_at, Temporal.Now.instant()) < 0;
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
