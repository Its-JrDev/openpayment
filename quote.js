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
            receiver: "https://ilp.interledger-test.dev/f537937b-7016-481b-b655-9f0d1014822c/incoming-payments/1b61dd27-2de0-4fb8-b1e6-0c847866bb17"
        }
    )

    console.dir(quote)
}

createQuote();