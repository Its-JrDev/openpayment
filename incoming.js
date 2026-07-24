import { RECEIVER_WALLET } from "./constants.js"
import { receiverClient } from "./receiver/clientReceiver.js";
import { walletReceivingAddress } from "./receiver/receiverWallet.js";
import { getReceivingGrant } from "./receiver/receiverGrant.js";

const createIncomingPayment = async () => {
    const receiverGrant = await getReceivingGrant();

    const incomingPayment = await receiverClient.incomingPayment.create(
        {
            url: walletReceivingAddress.resourceServer,
            accessToken: receiverGrant.access_token.value
        },
        {
            walletAddress: RECEIVER_WALLET,
            incomingAmount: {
                value: '1000',
                assetCode: walletReceivingAddress.assetCode,
                assetScale: walletReceivingAddress.assetScale
            }
        }
    );

    console.dir(incomingPayment)
}

createIncomingPayment();