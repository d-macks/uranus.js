const got = require('got');
const rbx = require('noblox.js');

class Kronos {
    constructor(key) {
        this.key = key;
    }

    get = {
        schedule : async (Division, All) => {
            if (!Division && !All) {
                return console.error('[kronos.js] Parameter "Division" can not be let empty!');
            }

            if (!["PBST", "PET", "TMS", "PBM"].includes(Division) && !All) {
                return console.error(`[kronos.js] ${Division} is not a valid division! Valid divisions are: [PBST, PET, TMS, PBM]`);
            }

            let promise = new Promise((resolve, reject) => {
                if (All === false || !All) {
                    got(`https://pb-kronos.dev/api/v2/schedule/${Division}`, {headers: {'Access-Key': this.key}}).then((data) => {
                        resolve(data.body);
                    }).catch((err) => {
                        reject(`${err.response.statusCode}: ${err.response.body}`);
                    })
                } else {
                    got(`https://pb-kronos.dev/api/v2/schedule/all`, {headers: {'Access-Key': this.key}}).then((data) => {
                        resolve(data.body);
                    }).catch((err) => {
                        reject(`${err.response.statusCode}: ${err.response.body}`);
                    })
                }
            })

            return await promise;

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

            got(`https://pb-kronos.dev/api/${Division}/blacklist/checkusers?userids=${id}`, {headers: {'Access-Key': this.key}}).then((data) => {
                return JSON.parse(data.body);
            }).catch((err) => {
                console.error(`${err.response.statusCode}: ${err.response.body}`);
            })
        }
    }
}

module.exports = Kronos;