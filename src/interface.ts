export interface ICryptoID {
    publicKey: CryptoKey
    privateKey: CryptoKey
    exportPrivateKey: JsonWebKey
    exportPublicKey: JsonWebKey
}
