import { senderClient } from "./clientSender.js"

export const getContinueGrant = async () => {
    return await senderClient.grant.continue(
        {
            accessToken: "CD8A7FC1760828608565",
            url: "https://auth.interledger-test.dev/continue/e354b603-b71e-4c58-b9bd-db7968f22331"
        },
        {
            interact_ref: "47f71bc0-fa43-4b80-8fe6-483629be7b0d"
        }
    )
}