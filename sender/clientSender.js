import { SENDER_WALLET, PRIVATE_SENDER_KEY_PATH, SENDER_KEY_ID} from '../constants.js';

import { createAuthenticatedClient } from '@interledger/open-payments'

export const senderClient = await createAuthenticatedClient({
  walletAddressUrl: SENDER_WALLET,
  privateKey: PRIVATE_SENDER_KEY_PATH,
  keyId: SENDER_KEY_ID
})