export async function sign(
    privateKey: CryptoKey,
    data: BufferSource
): Promise<ArrayBuffer> {
    return window.crypto.subtle.sign(
        {
            name: 'ECDSA',
            hash: { name: 'SHA-384' },
        },
        privateKey,
        data
    )
}

export async function verify(
    publicKey: CryptoKey,
    data: BufferSource,
    signature: ArrayBuffer
): Promise<boolean> {
    return window.crypto.subtle.verify(
        {
            name: 'ECDSA',
            hash: { name: 'SHA-384' },
        },
        publicKey,
        signature,
        data
    )
}
