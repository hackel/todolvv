/* eslint-disable @typescript-eslint/ban-ts-comment */
import { autocomplete } from '@algolia/autocomplete-js';
import { Inertia } from '@inertiajs/inertia';
import { MeiliSearch as SearchClient } from 'meilisearch';
import { Fragment, h, render } from 'vue';

type AnyObject = Record<string, unknown>;

const debounced = debouncePromise((items: unknown[]) => Promise.resolve(items), 250);

export function useAutocomplete(searchClient: SearchClient, options: AnyObject) {
    return autocomplete({
        openOnFocus: false,
        // @ts-ignore
        getSources({ query }) {
            return debounced([
                {
                    sourceId: 'entries',
                    getItems() {
                        return searchClient
                            .index('entries')
                            .search(query, {
                                attributesToCrop: ['text'],
                                attributesToHighlight: ['text'],
                                attributesToRetrieve: ['uuid', 'text'],
                                cropLength: 25,
                                limit: 10,
                            })
                            .then(results => results.hits)
                            .catch(() => []);
                    },
                    // @ts-ignore
                    onSelect({ item }) {
                        // @ts-ignore
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                        Inertia.get(route('entries.show', item.uuid));
                    },
                    templates: {
                        // @ts-ignore
                        item({ item }) {
                            return (
                                <div class="aa-ItemWrapper">
                                    <div class="aa-ItemContent">
                                        <div class="aa-ItemContentBody">
                                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                            <div class="aa-ItemContentDescription">{item.text}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        },
                    },
                },
            ]);
        },
        renderer: {
            // @ts-ignore
            createElement: h,
            Fragment,
        },
        render({ children }, root) {
            // @ts-ignore
            render(children, root);
        },
        ...options,
    });
}

// eslint-disable-next-line @typescript-eslint/ban-types
function debouncePromise(fn: Function, time: number) {
    let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

    return function debounced(...args: unknown[]) {
        if (timerId) {
            clearTimeout(timerId);
        }

        return new Promise(resolve => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            timerId = setTimeout(() => resolve(fn(...args)), time);
        });
    };
}
