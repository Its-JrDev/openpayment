import { senderClient } from './clientSender.js'
import { walletSenderAddress } from './senderWallet.js'

export const getQuoteGrant = async () => {
    return await senderClient.grant.request(
        {
            url: walletSenderAddress.authServer
        },
        {
            access_token: {
                access: [
                    {
                        type: 'quote',
                        actions: ['read', 'create']
                    }
                ]
            }
        }
    )
}