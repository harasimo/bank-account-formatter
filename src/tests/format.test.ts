import { invalidNumberLength } from '../lib/consts';
import { electronicFormat, readableFormat } from '../lib/format';

it.each([
    { input: '', expr: /12/g, error: invalidNumberLength },
    { input: '', expr: /\d{12}/g, error: invalidNumberLength },
    { input: '', expr: /(\d{6})(\d{6})/g, error: invalidNumberLength },
    { input: '     ', expr: /(\w{12})/g, error: invalidNumberLength },
    {
        input: '123',
        expr: /(\w{12})/g,
        error: 'Cannot match account number to given regular expression.',
    },
])(
    'readableFormat should throw for invalid input',
    ({ input, expr, error }) => {
        expect(() => readableFormat(input, expr)).toThrow(error);
    }
);

it.each([
    { input: '123', expr: /(\d{3})/g, expected: '123' },
    {
        input: '1234567890',
        expr: /(\d{2})(\d{4})(\d{4})/g,
        expected: '12 3456 7890',
    },
    {
        input: '123456aaaa7890',
        expr: /(\d{2})(\d{4})(\w{4})(\d{4})/g,
        expected: '12 3456 aaaa 7890',
    },
    {
        input: '06109026332184496362167129',
        expr: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
        expected: '06 1090 2633 2184 4963 6216 7129',
    },
    {
        input: 'PL06109026332184496362167129',
        expr: /(\w{2}\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
        expected: 'PL06 1090 2633 2184 4963 6216 7129',
    },
])(
    'readableFormat should properly format for $input',
    ({ input, expr, expected }) => {
        expect(readableFormat(input, expr)).toBe(expected);
    }
);

it.each(['', '     '])(
    'electronicFormat should return empty number',
    (input) => {
        expect(electronicFormat(input)).toBe('');
    }
);

it.each([
    { input: '123', expected: '123' },
    { input: '1234567890', expected: '1234567890' },
    {
        input: '123456aaaa7890',
        expected: '123456AAAA7890',
    },
    {
        input: '06109026332184496362167129',
        expected: '06109026332184496362167129',
    },
    {
        input: 'PL06109026332184496362167129',
        expected: 'PL06109026332184496362167129',
    },
    {
        input: 'pl06109026332184496362167129',
        expected: 'PL06109026332184496362167129',
    },
])(
    'electronicFormat should properly format for $input',
    ({ input, expected }) => {
        expect(electronicFormat(input)).toBe(expected);
    }
);
