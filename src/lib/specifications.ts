import { CountryCodes } from './countryCodes';

export interface Specification {
    countryCode: CountryCodes;
    nationalLength: number;
    sliceIndices: number[];
    formatRegExp: RegExp;
}

// example specification
export const pl: Specification = {
    countryCode: 'PL',
    nationalLength: 26,
    sliceIndices: [2, 7, 12, 17, 22, 27],
    formatRegExp: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
};
