import { SENDER_WALLET } from "./constants.js";
import { senderClient } from "./sender/clientSender.js";
import { getQuoteGrant } from "./sender/senderQuoteGrant.js";
import { walletSenderAddress } from "./sender/senderWallet.js";

const createQuote = async () => {

    const quoteGrant = await getQuoteGrant();

    const quote = await senderClient.quote.create(
        {
            url: walletSenderAddress.resourceServer,
            accessToken: quoteGrant.access_token.value
        },
        {
            method: 'ilp',
            walletAddress: SENDER_WALLET,
            receiver: ""
        }
    )

    console.dir(quote)
}

createQuote();