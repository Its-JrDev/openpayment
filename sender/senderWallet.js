import { RECEIVER_WALLET, SENDER_WALLET } from "../constants.js";
import { senderClient } from "./clientSender.js";

export const walletSenderAddress = await senderClient.walletAddress.get({
    url: SENDER_WALLET
})
