import { SENDER_WALLET } from "./constants.js";
import { senderClient } from "./sender/clientSender.js";
import { getContinueGrant } from "./sender/continueGrant.js"
import { walletSenderAddress } from "./sender/senderWallet.js";

const outgoingPayment = async () => {
    const grant = await getContinueGrant();

    console.dir(grant)

    const outgoingPayment = await senderClient.outgoingPayment.create(
        {
            url: walletSenderAddress.resourceServer,
            accessToken: grant.access_token.value
        },
        {
            walletAddress: SENDER_WALLET,
            quoteId: ""
        }
    )

    console.dir(outgoingPayment)
}

outgoingPayment()