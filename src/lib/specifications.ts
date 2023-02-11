export type CountryCodes = 'PL' | 'GB';

export interface Specification {
    countryCode: CountryCodes;
    nationalLength: number;
    sliceIndices: number[];
}

export const pl: Specification = {
    countryCode: 'PL',
    nationalLength: 26,
    sliceIndices: [2, 7, 12, 17, 22, 27],
};
