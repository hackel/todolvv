import { computed, VNodeProps, WritableComputedRef } from 'vue';

export function useModelWrapper<T>(
    props: Record<string, unknown> & VNodeProps,
    // eslint-disable-next-line @typescript-eslint/ban-types
    emit: Function,
    name = 'modelValue',
): WritableComputedRef<T> {
    return computed({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        get: (): T => props[name],
        set: (value: T) => emit(`update:${name}`, value),
    });
}
