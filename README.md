![build status](https://github.com/harasimo/bank-account-formatter/actions/workflows/node.js.yml/badge.svg)

# Simple bank account number formatting library

A really simple library for formatting bank account number.
This library only formats number - there is no validation or building IBAN.

## Usage

### With slice indices

```ts
const plSpecification: Specification = {
    countryCode: 'PL',
    nationalLength: 26,
    sliceIndices: [2, 7, 12, 17, 22, 27],
};

const accountNumber = new AccountNumber(
    plSpecification,
    '51853800024866795572319360'
);

// returns '51 8538 0002 4866 7955 7231 9360'
const humanReadable = accountNumber.humanReadable;

// returns '51853800024866795572319360'
const electronicFormat = accountNumber.electronicFormat;
```

### With format regexp

```ts
const plSpecification: Specification = {
    countryCode: 'PL',
    nationalLength: 26,
    formatRegExp: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
};

const accountNumber = new AccountNumber(
    plSpecification,
    '51853800024866795572319360'
);

// returns '51 8538 0002 4866 7955 7231 9360'
const humanReadable = accountNumber.humanReadable;

// returns '51853800024866795572319360'
const electronicFormat = accountNumber.electronicFormat;
```
