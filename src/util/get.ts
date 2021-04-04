// Native implementation for lodash get.
export const get = (obj: Object, path: string, defaultValue = undefined) => {
    const travel = (regexp: any) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce(
                (res, key) => (res !== null && res !== undefined ? (res as any)[key] : res),
                obj
            );
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};
