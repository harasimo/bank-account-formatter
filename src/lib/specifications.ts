import { CountryCodes } from './countryCodes';

export interface Specification {
    countryCode: CountryCodes;
    length: number;
    sliceIndices: number[];
    formatRegExp: RegExp;
}

// example specification
export const pl: Specification = {
    countryCode: 'PL',
    length: 26,
    sliceIndices: [2, 7, 12, 17, 22, 27],
    formatRegExp: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
};
