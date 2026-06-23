const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        if (!sock.authState.creds.registered) {
            const phoneNumber = '6283161640119' // GANTI NOMOR HP KAMU!
            try {
                const code = await sock.requestPairingCode(phoneNumber)
                console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║     🔥 BAILEYS DISZ AKTIF 🔥         ║
║                                       ║
║     KODE PAIRING: ${code}             ║
║                                       ║
╚═══════════════════════════════════════╝
                `)
            } catch (error) {
                console.log('Error:', error)
            }
        }

        if (connection === 'open') {
            console.log('✅ Bot WhatsApp ONLINE!')
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error?.output?.statusCode) !== DisconnectReason.loggedOut
            if (shouldReconnect) startBot()
        }
    })

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0]
        if (!msg.message) return
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
        const sender = msg.key.remoteJid

        if (text.toLowerCase() === 'hi') {
            await sock.sendMessage(sender, { text: '👋 Halo!' })
        } else if (text.toLowerCase() === 'ping') {
            await sock.sendMessage(sender, { text: '🏓 Pong!' })
        }
    })
}

console.log('🚀 Starting Bot by disz...')
startBot()
