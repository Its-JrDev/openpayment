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
                            quoteId: ""
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