import { autocomplete } from '@algolia/autocomplete-js';
import { Fragment, h, render } from 'vue';
import { MeiliSearch as SearchClient } from 'meilisearch';
import { Inertia } from '@inertiajs/inertia';

const debounced = debouncePromise((items: Object[]) => Promise.resolve(items), 250);

export function useAutocomplete(searchClient: SearchClient, options: Object) {
    return autocomplete({
        openOnFocus: false,
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
                    onSelect({ item }) {
                        Inertia.get(route('entries.show', item.uuid));
                    },
                    templates: {
                        item({ item }) {
                            return (
                                <div class="aa-ItemWrapper">
                                    <div class="aa-ItemContent">
                                        <div class="aa-ItemContentBody">
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
        onSubmit() {
            console.log('onSubmit', arguments);
        },
        renderer: {
            createElement: h,
            Fragment,
        },
        render({ children }, root) {
            render(children, root);
        },
        ...options,
    });
}

function debouncePromise(fn: Function, time: number) {
    let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

    return function debounced(...args: any) {
        if (timerId) {
            clearTimeout(timerId);
        }

        return new Promise(resolve => {
            timerId = setTimeout(() => resolve(fn(...args)), time);
        });
    };
}
