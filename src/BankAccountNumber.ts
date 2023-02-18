import {
    invalidNumberFormat,
    invalidNumberLength,
    numberCleanupRegexp,
} from './lib/consts';
import { electronicFormat, readableFormatWithRegExp } from './lib/format';
import { Specification } from './lib/specifications';

export class BankAccountNumber {
    constructor(
        private specification: Specification,
        private accountNumber: string
    ) {
        const { length, countryCode } = specification;

        // cleanup input
        this.accountNumber = accountNumber
            .replace(numberCleanupRegexp, '')
            .toUpperCase();

        this.validateInputNumber(length, countryCode);
    }

    private validateInputNumber(length: number, countryCode: string) {
        if (
            this.accountNumber.length < length ||
            this.accountNumber.length > length + countryCode.length
        ) {
            throw new Error(invalidNumberLength);
        }

        if (!this.specification.validationExpression.test(this.accountNumber)) {
            throw new Error(invalidNumberFormat);
        }
    }

    private get hasCountryCode() {
        return this.accountNumber.startsWith(this.specification.countryCode);
    }

    /**
     * Human-readable bank account number
     */
    public get humanReadable() {
        let accNumber = this.accountNumber;
        const { countryCode, formatRegExp } = this.specification;

        if (this.hasCountryCode) {
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

    /**
     * Human-readable formatted BBAN
     */
    public get nationalHumanReadable() {
        if (this.hasCountryCode) {
            return readableFormatWithRegExp(
                this.accountNumber.slice(2, this.accountNumber.length),
                this.specification.formatRegExp
            );
        }

        return readableFormatWithRegExp(
            this.accountNumber,
            this.specification.formatRegExp
        );
    }
}

export default BankAccountNumber;
