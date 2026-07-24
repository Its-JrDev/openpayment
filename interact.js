import { SENDER_WALLET } from "./constants.js"
import { senderClient } from "./sender/clientSender.js"
import { getOutgoingGrant } from "./sender/senderOutgoingGrant.js"
import { walletSenderAddress } from "./sender/senderWallet.js"

const interact = async () => {
    const grant = await getOutgoingGrant();

    console.dir(grant)
}

interact();