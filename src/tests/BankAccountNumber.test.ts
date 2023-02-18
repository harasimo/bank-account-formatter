import BankAccountNumber from '../BankAccountNumber';
import { invalidNumberFormat } from '../lib/consts';
import { Specification } from '../lib/specifications';

const dummySpec: Specification = {
    countryCode: 'PL',
    length: 26,
    formatRegExp: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
    validationExpression: /(\d{26})/,
};

it.each([
    '',
    '7010501924985447351461066612312321',
    'pladaa7010501924985447351461066612312321',
])('should throw for invalid number (%s)', (accNumber) => {
    expect(() => new BankAccountNumber(dummySpec, accNumber)).toThrow();
});

it.each([
    {
        input: '061090263aa184496362167129',
        spec: dummySpec,
    },
    {
        input: '061090263aa184496362167129',
        spec: { ...dummySpec, validationExpression: /^(\d{2})(\w{4})$/g },
    },
])(
    'should throw for invalid number format $spec.validationExpression',
    ({ input, spec }) => {
        expect(() => new BankAccountNumber(spec, input)).toThrow(
            invalidNumberFormat
        );
    }
);

it.each([
    '06109026332184496362167129',
    'PL06109026332184496362167129',
    'pl06109026332184496362167129',
])('should create instance for number %s', (accNumber) => {
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
    'should build human readable $spec.countryCode number for $input',
    ({ input, spec, expected }) => {
        expect(new BankAccountNumber(spec, input).humanReadable).toBe(expected);
    }
);

it.each([
    {
        input: '06109026332184496362167129',
        spec: dummySpec,
        expected: '06 1090 2633 2184 4963 6216 7129',
    },
    {
        input: 'PL06109026332184496362167129',
        spec: dummySpec,
        expected: '06 1090 2633 2184 4963 6216 7129',
    },
    {
        input: 'pl06109026332184496362167129',
        spec: dummySpec,
        expected: '06 1090 2633 2184 4963 6216 7129',
    },
])(
    'should build human readable $spec.countryCode BBAN for $input',
    ({ input, spec, expected }) => {
        expect(new BankAccountNumber(spec, input).nationalHumanReadable).toBe(
            expected
        );
    }
);

it.each([
    {
        input: '06109026332184496362167129',
        spec: dummySpec,
        expected: '06109026332184496362167129',
    },
    {
        input: '06 1090 2633 2184 4963 6216 7129',
        spec: dummySpec,
        expected: '06109026332184496362167129',
    },
    {
        input: '      06 1 090 263 3 21 84 4 963 62  16 712   9    ',
        spec: dummySpec,
        expected: '06109026332184496362167129',
    },
    {
        input: 'PL06109026332184496362167129',
        spec: dummySpec,
        expected: 'PL06109026332184496362167129',
    },
    {
        input: 'pl06109026332184496362167129',
        spec: dummySpec,
        expected: 'PL06109026332184496362167129',
    },
    {
        input: 'pl061--&&090..263,32184  4963+-6/216<>7129',
        spec: dummySpec,
        expected: 'PL06109026332184496362167129',
    },
])(
    'should build computer readable $spec.countryCode number for $input',
    ({ input, spec, expected }) => {
        expect(new BankAccountNumber(spec, input).electronicFormat).toBe(
            expected
        );
    }
);
