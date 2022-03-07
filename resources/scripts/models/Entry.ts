import { nanoid } from 'nanoid';

export default class Entry {
    id: string;
    text: string;
    completed_at: Temporal.Instant;
    expires_at: Temporal.Instant;
    updated_at: Temporal.Instant;
    created_at: Temporal.Instant;

    static new(args: Object = {}): Entry {
        return Object.assign(new Entry(), {
            ...args,
            id: nanoid(),
        });
    }

    complete() {
        this.completed_at = Temporal.Now.instant();
    }

    clone(): Entry {
        return Entry.new(this);
    }
}
