import { ICryptoID } from 'src/interface'
import { exportKeyPair, parse, stringify } from 'src/serialize'
import { sign, verify } from 'src/usage'

export class CryptoID implements ICryptoID {
    public readonly privateKey: CryptoKey
    public readonly publicKey: CryptoKey
    public readonly exportPrivateKey: JsonWebKey
    public readonly exportPublicKey: JsonWebKey

    constructor(
        privateKey: CryptoKey,
        publicKey: CryptoKey,
        exportPrivateKey: JsonWebKey,
        exportPublicKey: JsonWebKey
    ) {
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.exportPrivateKey = exportPrivateKey
        this.exportPublicKey = exportPublicKey
    }

    public async sign(data: BufferSource): Promise<ArrayBuffer> {
        return sign(this.privateKey, data)
    }

    public async verify(
        data: BufferSource,
        signature: ArrayBuffer
    ): Promise<boolean> {
        return verify(this.publicKey, data, signature)
    }

    public toJSON(): string {
        return stringify(this)
    }

    public toString(): string {
        return stringify(this)
    }
}

export async function createId(): Promise<CryptoID> {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: 'ECDSA',
            namedCurve: 'P-384',
        },
        true,
        ['sign', 'verify']
    )
    const { exportPublicKey, exportPrivateKey } = await exportKeyPair(keyPair)

    return new CryptoID(
        keyPair.privateKey,
        keyPair.publicKey,
        exportPrivateKey,
        exportPublicKey
    )
}

export async function importId(source: string): Promise<CryptoID | null> {
    const parseResult = await parse(source)
    if (!parseResult) {
        return null
    }

    const { privateKey, publicKey, exportPublicKey, exportPrivateKey } =
        parseResult
    return new CryptoID(
        privateKey,
        publicKey,
        exportPrivateKey,
        exportPublicKey
    )
}
