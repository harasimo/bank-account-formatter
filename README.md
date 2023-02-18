![build status](https://github.com/harasimo/bank-account-formatter/actions/workflows/node.js.yml/badge.svg)

# Simple bank account number formatting library

This library provides simple abstraction over bank account formatting. Just create instance with proper specification.

## Usage

In order to create `BankAccountNumber` instance, it is necessary to pass `specification` and `accountNumber` in object constructor. A `specification` is defined as object with `countryCode`, `length`, `formatRegexp` and `validationExpression` properties - shaped with `Specification` interface. For reference check `pl` specification.

Example usage:

```ts
const plSpecification: Specification = {
    countryCode: 'PL',
    length: 26,
    formatRegExp: /(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})/g,
    validationExpression: /^(PL)?(\d{26})$/,
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

## API

A `BankAccountNumber` instance exposes few getters for easy access to formatted bank account number.

### `humanReadable`

Returns human readable formatted number.

```ts
// without country code
const accountNumber = new AccountNumber(
    specification,
    '51853800024866795572319360'
);

// returns '51 8538 0002 4866 7955 7231 9360'
const humanReadable = accountNumber.humanReadable;

// with country code
const ibanNumber = new AccountNumber(
    specification,
    'PL51853800024866795572319360'
);

// returns 'PL51 8538 0002 4866 7955 7231 9360'
const ibanHumanReadable = ibanNumber.humanReadable;
```

### `nationalHumanReadable`

Returns BBAN (Basic Bank Account Number) in human readable format.

```ts
const accountNumber = new AccountNumber(
    specification,
    'PL51853800024866795572319360'
);

// returns '51 8538 0002 4866 7955 7231 9360'
const humanReadable = accountNumber.nationalHumanReadable;
```

### `electronicFormat`

Returns computer-friendly account number.

```ts
const accountNumber = new AccountNumber(
    specification,
    'PL51 8538 0002 4866 7955 7231 9360'
);

// returns 'PL51853800024866795572319360'
const electronicFormat = accountNumber.electronicFormat;
```
