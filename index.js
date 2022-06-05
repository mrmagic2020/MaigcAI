const logger = new NIL.Logger(`test`);
const { group } = require("console");
const path = require(`path`);

let bot = NIL.bots.getBot(NIL._vanilla.cfg.self_id);

const config = JSON.parse(NIL.IO.readFrom(path.join(__dirname, `config.json`)));
const owner_id = config.owner_id;
const group_id = config.group_id;

function getText(e) {
    var rt = '';
    for (i in e.message) {
        switch (e.message[i].type) {
            case "text":
                rt += e.message[i].text;
                break;
        }
    }
    return rt;
}

class MagicAI extends NIL.ModuleBase{
    onStart(api){
        logger.setTitle(`MagicAI`);
        logger.info(`MagicAI loaded!`);
        bot.on(`message.private.friend`, (e) => {
            let text = getText(e);
            let pt = text.split(` `);
            if(e.from_id == owner_id){
                bot.sendGroupMsg(group_id, e.message);
            }
        })
    }
}

module.exports = new MagicAI