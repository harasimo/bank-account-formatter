export type CountryCodes = 'PL' | 'GB';

export interface Specification {
    countryCode: CountryCodes;
    nationalLength: number;
    ibanLength: number;
    sliceIndices: number[];
}

export const pl: Specification = {
    countryCode: 'PL',
    nationalLength: 26,
    ibanLength: 28,
    sliceIndices: [2, 7, 12, 17, 22, 27],
};
