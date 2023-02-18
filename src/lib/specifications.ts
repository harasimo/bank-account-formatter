import { CountryCodes } from './countryCodes';

export interface Specification {
    countryCode: CountryCodes;

    /** Account number full length (with country code) */
    length: number;

    /** Human readable formatting expression */
    formatRegExp: RegExp;

    /** Number validation expression */
    validationExpression: RegExp;
}

// example specification
export const pl: Specification = {
    countryCode: 'PL',
    length: 26,
    formatRegExp: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
    validationExpression: /^(PL)?(\d{26})$/,
};
