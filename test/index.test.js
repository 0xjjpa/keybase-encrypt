/* global it */
/* global expect */

import P from 'bluebird'
import kbpgp from 'kbpgp'
import * as Fixture from './fixtures'

const encrypt = require('../src')

const importFromArmoredPgp = P.promisify(kbpgp.KeyManager.import_from_armored_pgp)
const unbox = P.promisify(kbpgp.unbox)

it('returns a encrypted message given a public key that can be decrypted with its private pair', async () => {
  const encryptedMessage = await encrypt(Fixture.publicKey, Fixture.message)

  const keyManager = await importFromArmoredPgp({armored: Fixture.privateKey})
      .then((keyManager) => keyManager)

  keyManager.unlock_pgp({ passphrase: Fixture.passphrase }, () => {})

  const ring = new kbpgp.keyring.KeyRing()
  ring.add_key_manager(keyManager)

  const literal = await unbox({ keyfetch: ring, armored: encryptedMessage })
      .then((literals) => literals.shift())

  expect(literal.toString()).toBe(Fixture.message)
})

it('fails to decrypt a message with a different private key than its original pair', async () => {
  const encryptedMessage = await encrypt(Fixture.wrongPublicKey, Fixture.message)

  const keyManager = await importFromArmoredPgp({armored: Fixture.privateKey})
      .then((keyManager) => keyManager)

  keyManager.unlock_pgp({ passphrase: Fixture.passphrase }, () => {})

  const ring = new kbpgp.keyring.KeyRing()
  ring.add_key_manager(keyManager)

  const err = await unbox({ keyfetch: ring, armored: encryptedMessage })
      .catch((err) => err)

  expect(err).toThrow()
})
