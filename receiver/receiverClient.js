import { RECEIVER_WALLET, PRIVATE_RECEIVER_KEY_PATH, RECEIVER_KEY_ID } from '../constants.js';

import { createAuthenticatedClient } from '@interledger/open-payments'

export const receiverClient = await createAuthenticatedClient({
  walletAddressUrl: RECEIVER_WALLET,
  privateKey: PRIVATE_RECEIVER_KEY_PATH,
  keyId: RECEIVER_KEY_ID
})