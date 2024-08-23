//importar dependência
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//testnet -> rede de teste bitcoin
const network = bitcoin.networks.testnet

//derivação carteira hierárquica determinística (HD)
const path = "m/49'/1'/0'/0"

//mnemonico -> conjunto de palavras aleatórias que formam a seed 
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando raiz da carteira HD 
let root = bip32.fromSeed(seed, network)

//criando uma conta - Private and Public Keys pair
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

/*
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address
*/

const bech32Address = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log('Carteira gerada!')
console.log('Endereço: ', bech32Address)
console.log('Chave privada: ', node.toWIF()) //Wallet Import Format WIF formata a chave para conseguir importar em software de gerenciamento de carteiras (no caso Electrum)
console.log('Seed: ', mnemonic)

