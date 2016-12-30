import P from 'bluebird'
import kbpgp from 'kbpgp'

const importFromArmoredPgp = P.promisify(kbpgp.KeyManager.import_from_armored_pgp)
const box = P.promisify(kbpgp.box)

module.exports = async function encrypt (publicKey, message) {
  try {
    const keyManager = await importFromArmoredPgp({armored: publicKey})
        .then((keyManager) => keyManager)

    const encryptedMessage = await box({ encrypt_for: keyManager, msg: message })
        .then((encrypted) => encrypted)

    return Promise.resolve(encryptedMessage)
  } catch (err) {
    return Promise.reject(err)
  }
}
