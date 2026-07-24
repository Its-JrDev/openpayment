import {
    createAuthenticatedClient,
    isFinalizedGrantWithAccessToken
} from '@interledger/open-payments'
import { senderClient } from './clientSender.js'
import { walletSenderAddress } from './senderWallet.js'
import { v4 as uuidv4 } from 'uuid';

export const getOutgoingGrant = async (quote) => {
    return await senderClient.grant.request(
        {
            url: walletSenderAddress.authServer
        },
        {
            access_token: {
                access: [
                    {
                        identifier: walletSenderAddress.id,
                        type: 'outgoing-payment',
                        actions: ['list', 'list-all', 'read', 'read-all', 'create'],
                        limits: {
                            quoteId: "https://ilp.interledger-test.dev/f537937b-7016-481b-b655-9f0d1014822c/quotes/2eaae76b-34b6-453e-9631-215576c88ac8"
                        }
                    }
                ]
            }, interact: {
                start: ['redirect'],
                finish: {
                    method: "redirect",
                    uri: "http://localhost:3000",
                    nonce: uuidv4()
                }
            }
        }
    )
}