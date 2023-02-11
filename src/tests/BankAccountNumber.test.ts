import BankAccountNumber from '..';
import { Specification } from 'lib/specifications';

const dummySpec: Specification = {
    countryCode: 'PL',
    ibanLength: 28,
    nationalLength: 26,
    sliceIndices: [2, 7, 12, 17, 22, 27],
};

it.each([
    '',
    '7010501924985447351461066612312321',
    'pladaa7010501924985447351461066612312321',
])('should throw for invalid number (%s)', (accNumber) => {
    expect(() => new BankAccountNumber(dummySpec, accNumber)).toThrow();
});

it.each([
    '06109026332184496362167129',
    'PL06109026332184496362167129',
    'pl06109026332184496362167129',
])('should create instance for %s', (accNumber) => {
    expect(() => new BankAccountNumber(dummySpec, accNumber)).not.toThrow();
});

it.each([
    {
        input: '06109026332184496362167129',
        spec: dummySpec,
        expected: '06 1090 2633 2184 4963 6216 7129',
    },
    {
        input: 'PL06109026332184496362167129',
        spec: dummySpec,
        expected: 'PL06 1090 2633 2184 4963 6216 7129',
    },
    {
        input: 'pl06109026332184496362167129',
        spec: dummySpec,
        expected: 'PL06 1090 2633 2184 4963 6216 7129',
    },
])(
    'should properly format $spec.countryCode number for $input',
    ({ input, spec, expected }) => {
        expect(new BankAccountNumber(spec, input).humanReadable).toBe(expected);
    }
);
