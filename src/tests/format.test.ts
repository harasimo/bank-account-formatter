import { electronicFormat, readableFormat } from '../lib/format';

it.each([
    { input: '', indices: [] },
    { input: '', indices: [2] },
    { input: '', indices: [2, 4] },
    { input: '     ', indices: [2, 4] },
])('readableFormat should throw for invalid input', ({ input, indices }) => {
    expect(() => readableFormat(input, indices)).toThrow();
});

it.each([
    { input: '123', indices: [], expected: '123' },
    { input: '1234567890', indices: [2, 7], expected: '12 3456 7890' },
    {
        input: '123456aaaa7890',
        indices: [2, 7, 12],
        expected: '12 3456 aaaa 7890',
    },
    {
        input: '06109026332184496362167129',
        indices: [2, 7, 12, 17, 22, 27],
        expected: '06 1090 2633 2184 4963 6216 7129',
    },
    {
        input: 'PL06109026332184496362167129',
        indices: [4, 9, 14, 19, 24, 29],
        expected: 'PL06 1090 2633 2184 4963 6216 7129',
    },
])(
    'readableFormat should properly format for $input',
    ({ input, indices, expected }) => {
        expect(readableFormat(input, indices)).toBe(expected);
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
