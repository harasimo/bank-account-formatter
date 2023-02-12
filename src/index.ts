import { invalidNumberLength, numberCleanupRegexp } from './lib/consts';
import { electronicFormat, readableFormat } from './lib/format';
import { Specification } from './lib/specifications';

export class BankAccountNumber {
    constructor(
        private specification: Specification,
        private accountNumber: string
    ) {
        const { nationalLength, countryCode } = specification;
        this.accountNumber = accountNumber
            .replace(numberCleanupRegexp, '')
            .toUpperCase();

        if (
            this.accountNumber.length < nationalLength ||
            this.accountNumber.length > nationalLength + countryCode.length
        ) {
            throw new Error(invalidNumberLength);
        }
    }

    /**
     * Human-readable bank account number
     */
    public get humanReadable() {
        let accNumber = this.accountNumber;
        const { countryCode, sliceIndices } = this.specification;

        if (accNumber.startsWith(countryCode)) {
            accNumber = accNumber.slice(2, accNumber.length);

            return `${countryCode}${readableFormat(accNumber, sliceIndices)}`;
        }

        return readableFormat(accNumber, sliceIndices);
    }

    /**
     * Ccomputer-friendly bank account number
     */
    public get electronicFormat() {
        return electronicFormat(this.accountNumber);
    }
}

export default BankAccountNumber;
