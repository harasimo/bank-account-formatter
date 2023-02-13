import { invalidNumberLength, numberCleanupRegexp } from './consts';

/**
 * Formats given account number to human-friendly string
 * @param accountNumber Number to be formatted
 * @param indices Array of indices - groups definition
 * @returns Human-friendly formatted account number
 */
export const readableFormat: (
    accountNumber: string,
    indices: number[]
) => string = (accountNumber, indices) => {
    if (!accountNumber.replace(numberCleanupRegexp, '').length) {
        throw new Error(invalidNumberLength);
    }

    for (const index of indices) {
        const left = accountNumber.slice(0, index);
        const right = accountNumber.slice(index);

        accountNumber = `${left} ${right}`;
    }

    return accountNumber;
};

/**
 *
 * @param accountNumber Number to be formatted
 * @param expr Regular expression - format
 * @returns Human-friendly formatted account number
 */
export const readableFormatWithRegExp: (
    accountNumber: string,
    expr: RegExp
) => string = (accountNumber, expr) => {
    if (!accountNumber.replace(numberCleanupRegexp, '').length) {
        throw new Error(invalidNumberLength);
    }

    const matchResult = [...accountNumber.matchAll(expr)];

    const firstMatch = matchResult.at(0) ?? [];
    if (!firstMatch?.length) {
        throw new Error(
            'Cannot match account number to given regular expression.'
        );
    }

    // remove 'match' - we need only capturing groups
    const groups = firstMatch?.slice(1);

    return groups.join(' ');
};

/**
 * Formats given account number to computer-friendly string
 * @param accountNumber Number to be formatted
 * @returns Computer-friendly formatted account number
 */
export const electronicFormat: (accountNumber: string) => string = (
    accountNumber
) => accountNumber.replace(/[\s-]/g, '').toUpperCase();
