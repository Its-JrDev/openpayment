// Import dependencies
import {
    createAuthenticatedClient,
    isFinalizedGrantWithAccessToken
} from '@interledger/open-payments'
import { RECEIVER_WALLET } from '../constants.js'
import { receiverClient } from './receiverClient.js'
import { walletReceivingAddress } from './receiverWallet.js'

export const getReceivingGrant = async () => {
    return await receiverClient.grant.request(
        {
            url: walletReceivingAddress.authServer
        },
        {
            access_token: {
                access: [
                    {
                        type: 'incoming-payment',
                        actions: ['list', 'read', 'read-all', 'complete', 'create']
                    }
                ]
            }
        }
    )
}