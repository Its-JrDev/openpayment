import { RECEIVER_WALLET } from "../constants.js";
import { receiverClient } from "./clientReceiver.js";

export const walletReceivingAddress = await receiverClient.walletAddress.get({
    url: RECEIVER_WALLET
})
