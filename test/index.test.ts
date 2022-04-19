import { describe, expect, test } from 'vitest'
import { CryptoID } from 'src'

describe('CryptoID', () => {
    test('base', () => {
        expect(CryptoID).toBeDefined()
        expect(new CryptoID()).toBeInstanceOf(CryptoID)
    })
})
