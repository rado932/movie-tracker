/**
 * Makes the first letter of a string a capital.
 * If wrong input is provided it will try to .toString the input or return an empty string.
 */
export const humanName = (name) => {
    if (!name) return "";
    if (typeof name !== "string") name = name.toString();
    return name.substring(0,1).toUpperCase() + name.substring(1, name.length);
};
/**
 * Removes all the gaps from a string.
 * If wrong input is provided it will try to .toString the input or return an empty string.
 */
export const removeGaps = (obj) => {
    if (!obj) return "";
    return `${obj}`.replace(/\s/g, '');
};
/**
 * Formats a list of options to options that Select would like.
 * If a not Array input is provided it will return a empty list.
 */
export const formatOptions = (opt) => {
    if (!opt || !Array.isArray(opt)) return [];
    return opt.map( x => ({value: removeGaps(x), label: x}));
};
/**
 * Removes the duplicates from the supplied list list.
 * If a not Array input is provided it will return a empty list.
 */
export const removeDuplicates = (list) => {
    if (!list || !Array.isArray(list)) return [];
    return list.map(elm => removeGaps(elm))
        .filter((elem, pos, arr) => arr.indexOf(elem) === pos);
};