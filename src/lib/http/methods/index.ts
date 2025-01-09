export const get = (pathname: string, controller: () => string): Route => {
    return {
        method: 'GET',
        pathname,
        controller,
    } as Route;
};
