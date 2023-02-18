import { invalidNumberLength, numberCleanupRegexp } from './lib/consts';
import { electronicFormat, readableFormatWithRegExp } from './lib/format';
import { Specification } from './lib/specifications';

export class BankAccountNumber {
    constructor(
        private specification: Specification,
        private accountNumber: string
    ) {
        const { length: length, countryCode } = specification;
        this.accountNumber = accountNumber
            .replace(numberCleanupRegexp, '')
            .toUpperCase();

        if (
            this.accountNumber.length < length ||
            this.accountNumber.length > length + countryCode.length
        ) {
            throw new Error(invalidNumberLength);
        }
    }

    /**
     * Human-readable bank account number
     */
    public get humanReadable() {
        let accNumber = this.accountNumber;
        const { countryCode, formatRegExp } = this.specification;

        if (accNumber.startsWith(countryCode)) {
            accNumber = accNumber.slice(2, accNumber.length);

            return `${countryCode}${readableFormatWithRegExp(
                accNumber,
                formatRegExp
            )}`;
        }

        return readableFormatWithRegExp(accNumber, formatRegExp);
    }

    /**
     * Ccomputer-friendly bank account number
     */
    public get electronicFormat() {
        return electronicFormat(this.accountNumber);
    }
}

export default BankAccountNumber;
