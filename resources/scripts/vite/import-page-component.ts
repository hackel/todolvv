export function importPageComponent(name: string, pages: Record<string, unknown>) {
    for (const path in pages) {
        if (path.endsWith(`${name.replaceAll('.', '/')}.vue`)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return typeof pages[path] === 'function' ? pages[path]() : pages[path];
        }
    }

    throw new Error(`Page not found: ${name}`);
}
