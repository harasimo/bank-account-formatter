import { CountryCodes } from './countryCodes';

export interface Specification {
    countryCode: CountryCodes;
    nationalLength: number;
    sliceIndices: number[];
}

// example specification
export const pl: Specification = {
    countryCode: 'PL',
    nationalLength: 26,
    sliceIndices: [2, 7, 12, 17, 22, 27],
};
