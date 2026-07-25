import { senderClient } from "./clientSender.js"

export const getContinueGrant = async () => {
    return await senderClient.grant.continue(
        {
            accessToken: "",
            url: ""
        },
        {
            interact_ref: ""
        }
    )
}