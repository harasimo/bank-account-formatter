import { Specification } from 'lib/specifications';

export class BankAccountNumber {
    constructor(
        private specification: Specification,
        private accountNumber: string
    ) {
        if (
            accountNumber.length < specification.nationalLength ||
            accountNumber.length > specification.ibanLength
        ) {
            throw new Error('Invalid number length');
        }
    }

    public get humanReadable() {
        let accNumber = this.accountNumber;
        const { countryCode, sliceIndices } = this.specification;

        if (accNumber.toUpperCase().startsWith(countryCode)) {
            accNumber = accNumber.slice(2, accNumber.length);

            return `${countryCode}${this.format(accNumber, sliceIndices)}`;
        }

        return this.format(accNumber, sliceIndices);
    }

    private format: (an: string, i: number[]) => string = (
        accountNumber,
        indices
    ) => {
        for (const index of indices) {
            const left = accountNumber.slice(0, index);
            const right = accountNumber.slice(index);

            accountNumber = `${left} ${right}`;
        }

        return accountNumber;
    };
}

export default BankAccountNumber;
