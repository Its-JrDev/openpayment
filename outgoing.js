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
            quoteId: "https://ilp.interledger-test.dev/f537937b-7016-481b-b655-9f0d1014822c/quotes/b33e6590-26b3-4a29-9895-3056903e9ada"
        }
    )

    console.dir(outgoingPayment)
}

outgoingPayment()