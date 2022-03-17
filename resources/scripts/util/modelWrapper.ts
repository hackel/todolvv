import { computed, VNodeProps, WritableComputedRef } from 'vue';

export function useModelWrapper<T>(
    props: Record<string, unknown> & VNodeProps,
    emit: Function,
    name = 'modelValue',
): WritableComputedRef<T> {
    return computed({
        // @ts-ignore
        get: (): T => props[name],
        set: (value: T) => emit(`update:${name}`, value),
    });
}
