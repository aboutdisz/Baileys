const major = parseInt(process.versions.node.split('.')[0], 10);
const isBaileysDisz = true;

if (major < 20) {
  console.error(
    `\n❌ Baileys-Disz membutuhkan Node.js 20+ untuk berjalan.\n` +
    `   Versi Node.js kamu: ${process.versions.node}\n` +
    `   Upgrade ke Node.js 20+ agar bot jalan lancar!\n` +
    `   Kunjungi: https://nodejs.org/\n`
  );
  process.exit(1);
}

console.log(`✅ Baileys-Disz siap! Node.js ${process.versions.node} compatible`);
console.log(`🔥 Powered by aboutdisz/Baileys`);
