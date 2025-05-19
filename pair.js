const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore
} = require("@whiskeysockets/baileys": "github:seiren-primrose/PL-Baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    let num = req.query.number;
        async function PairCode() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(`./session`)
     try {
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: [ "Ubuntu", "Chrome", "20.0.04" ],
             });
             if(!sock.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await sock.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            sock.ev.on('creds.update', saveCreds)
            sock.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(10000);
                    const sessionsock = fs.readFileSync('./session/creds.json');
                    
				const sockses = await sock.sendMessage(sock.user.id, { document: sessionsock, mimetype: `application/json`, fileName: `creds.json` });
               
				await sock.sendMessage(sock.user.id, { text: `> 👑*ᴍʏ ᴏᴡɴᴇʀ ɪɴꜰᴏ* ⚖️\n\n*🦅ɴᴀᴍᴇ -: 𝚆𝙰𝚃𝚂𝙾𝙽 ꜰᴏᴜʀᴘᴇɴᴄᴇ*\n*✨️ᴀɢᴇ -: 21*\n*🫧ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ* -: https://whatsapp.com/channel/0029Vb2bsRhLCoWthwxUC82B\n*👑ηυмвєя* -: +263789622747\n*🧬уσυтυвє* -: https://www.youtube.com/@watson-official-b8u\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ -: *👑©ᴡᴀᴛꜱᴏɴ-ꜰᴏᴜʀᴘᴇɴᴄᴇ👾2025👾*

` }, {quoted: sockses});
        await delay(100);
        return await removeFile('./session');
        process.exit(0)
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    PairCode();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./session');
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await PairCode()
});

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})

module.exports = router
