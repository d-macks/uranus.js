const got = require('got');
const rbx = require('noblox.js');

class Kronos {
    constructor(key) {
        this.key = key;
    }

    get = {
        schedule : (Division) => {
            if (!Division) {
                return console.error('[kronos.js] Parameter "Division" can not be let empty!');
            }

            if (!["PBST", "PET", "TMS", "PBM"].includes(Division)) {
                return console.error(`[kronos.js] ${Division} is not a valid division! Valid divisions are: [PBST, PET, TMS, PBM]`);
            }

            got(`https://pb-kronos.dev/api/schedule/${Division}`, {headers: {'Access-Key': this.key}}).then(async (res) => {
                return JSON.parse(res.body);
            }).catch((err) => {
                console.error(`${err.response.statusCode}: ${err.response.body}`);
            })
        },

        blacklist : (Division, Username) => {
            let id;

            if (!Division || !Username) {
                return console.error('[kronos.js] Parameter "Division" or "Username" can not be let empty!');
            }

            if (!["PBST", "PET", "TMS", "PBM"].includes(Division)) {
                return console.error(`[kronos.js] ${Division} is not a valid division! Valid divisions are: [PBST, PET, TMS, PBM]`);
            }

            rbx.getIdFromUsername(Username).then(f => id = f);

            got(`https://pb-kronos.dev/api/${Division}/blacklist/checkusers?userids=${id}`, {headers: {'Access-Key': this.key}}).then(async (res) => {
                return JSON.parse(res.body);
            }).catch((err) => {
                console.error(`${err.response.statusCode}: ${err.response.body}`);
            })
        }
    }
}

module.exports = Kronos;