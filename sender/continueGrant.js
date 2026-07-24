import { senderClient } from "./clientSender.js"

export const getContinueGrant = async () => {
    return await senderClient.grant.continue(
        {
            accessToken: "6E6C14B8EA88BC7AF93E",
            url: "https://auth.interledger-test.dev/continue/c852f541-e23c-407d-beca-c49f3336e72b"
        },
        {
            interact_ref: "60dc07a4-2c28-4b77-a31e-00297eb003e8"
        }
    )
}