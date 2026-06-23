const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection } = update

        if (!sock.authState.creds.registered) {
            const phoneNumber = '6283161640119' // GANTI NOMOR HP KAMU!
            try {
                const code = await sock.requestPairingCode(phoneNumber)
                console.log('🔥 KODE PAIRING: ' + code)
            } catch (error) {
                console.log('Error:', error.message)
            }
        }

        if (connection === 'open') {
            console.log('✅ BOT ONLINE!')
        }
    })
}

start()
