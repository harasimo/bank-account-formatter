![build status](https://github.com/harasimo/bank-account-formatter/actions/workflows/node.js.yml/badge.svg)

# Simple bank account number formatting library

A really simple library for formatting bank account number.
This library only formats number - there is no building IBAN.

## Usage

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
