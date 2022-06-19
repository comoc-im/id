import { ICryptoID } from 'src/interface'

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

export function stringify(id: ICryptoID): string {
    const obj: ExportIdObject = {
        privateKey: id.exportPrivateKey,
        publicKey: id.exportPublicKey,
    }
    return JSON.stringify(obj)
}

export async function parse(source: string): Promise<ICryptoID | null> {
    try {
        const { privateKey, publicKey } = JSON.parse(source) as ExportIdObject
        return {
            privateKey: await window.crypto.subtle.importKey(
                'jwk',
                privateKey,
                {
                    name: 'ECDSA',
                    namedCurve: 'P-384',
                },
                true,
                ['sign']
            ),
            publicKey: await window.crypto.subtle.importKey(
                'jwk',
                publicKey,
                {
                    name: 'ECDSA',
                    namedCurve: 'P-384',
                },
                true,
                ['verify']
            ),
            exportPrivateKey: privateKey,
            exportPublicKey: publicKey,
        }
    } catch (err) {
        return null
    }
}
