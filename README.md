# keybase-encrypt [![Build Status](https://img.shields.io/travis/jjperezaguinaga/keybase-encrypt/master.svg?style=flat-square)](https://travis-ci.org/jjperezaguinaga/keybase-encrypt)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


🔑  Using kbpgp to encrypt messages based on a public key

## Install

```bash
$ npm install keybase-encrypt --save
```

## Usage

```js
const encrypt = require('keybase-encrypt')

const publicKey =  `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v2.0.56
Comment: https://keybase.io/jjperezaguinaga

xsFNBFfglq0BEADTvFWRPl18pcBKQmQH8WaiGQ+JXZScuv1PXAcereGrObZbQ4oN
...
`

const message = 'This is a test'

try {
  encrypt(publicKey, message).then(encryptedMessage => {
    console.log(encryptedMessage)
    /*
    -----BEGIN PGP MESSAGE-----
    Version: Keybase OpenPGP v2.0.62
    Comment: https://keybase.io/crypto

    wcBMA6gpy0Zv/UOFAQf7BU9CCbsM4noJbsCz9sW7/dSzPOsRlQeQdnVO6SYYvQxE
    ...
    -----END PGP MESSAGE-----
    */
  })
} catch(err) {
    console.log('There was an error encrypting', err)
}


```

## Related

[E.nigma](https://github.com/jjperezaguinaga/e.nigma.pw) - 🔐 e.nigma.pw / Encryption toolbox utility

## License

MIT © [Jose Aguinaga](https://jjperezaguinaga.com)
