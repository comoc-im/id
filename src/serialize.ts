interface ExportIdObject {
    publicKey: JsonWebKey
    privateKey: JsonWebKey
}

export async function exportKeyPair(
    keyPair: CryptoKeyPair
): Promise<{ exportPrivateKey: JsonWebKey; exportPublicKey: JsonWebKey }> {
    const exportPrivateKey = await window.crypto.subtle.exportKey(
        'jwk',
        keyPair.privateKey
    )
    const exportPublicKey = await window.crypto.subtle.exportKey(
        'jwk',
        keyPair.publicKey
    )
    return { exportPrivateKey, exportPublicKey }
}

export function stringify(
    exportPrivateKey: JsonWebKey,
    exportPublicKey: JsonWebKey
): string {
    const obj: ExportIdObject = {
        privateKey: exportPrivateKey,
        publicKey: exportPublicKey,
    }
    return JSON.stringify(obj)
}

export async function parse(source: string): Promise<{
    exportPrivateKey: JsonWebKey
    exportPublicKey: JsonWebKey
} | null> {
    const { privateKey, publicKey } = JSON.parse(source) as ExportIdObject
    return { exportPrivateKey: privateKey, exportPublicKey: publicKey }
}
