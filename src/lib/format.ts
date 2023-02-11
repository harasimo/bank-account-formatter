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
    for (const index of indices) {
        const left = accountNumber.slice(0, index);
        const right = accountNumber.slice(index);

        accountNumber = `${left} ${right}`;
    }

    return accountNumber;
};

/**
 * Formats given account number to computer-friendly string
 * @param accountNumber Number to be formatted
 * @returns Computer-friendly formatted account number
 */
export const electronicFormat: (accountNumber: string) => string = (
    accountNumber
) => accountNumber.replace(/[\s-]/g, '').toUpperCase();
