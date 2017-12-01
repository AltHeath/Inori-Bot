const Express = require('express');
const Twitter = require('twit');
const _ = require('underscore');
const moment = require('moment');
const fs = require('mz/fs');
require('moment-timezone');
const app = Express();


const commando = require('discord.js-commando');
const fetch = require('node-fetch');
const path = require('path');

const client = new commando.Client();


client
// Events
.on('error', console.error)
.on('warn', console.warn)
//.on('debug', console.log)

// Custom groups
client.registry
    // Registers your custom command groups
    .registerGroups([
        ['random', 'Fun commands'],
        ['pso2', 'Phantasy Star Online 2 Commands'],
        ['other', 'Under construction']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));


// dailies attempt
app.get('/daily', async (req, res) => {
    const now = moment().tz("Japan");
    const result = [];
    
    for (let eq of JSON.parse(await fs.readFile('./dos.json', 'utf8'))) {
        const name = eq[0];
        const startDate = moment(eq[1], '2017-11-30').subtract(1, 'day');
        const intervals = eq[2];
    
        let i = 0;
        while (startDate <= now) {
            if (startDate.isSame(now, 'day')) {
                 result.push(name);
             }
    
             startDate.add(intervals[i++ % intervals.length], 'day');
         }
    }
    
        res.send(result);
    });   
    
app.listen(5000, () => {
        console.log("Listening on port 5000.");
});    

client.login('TOKEN');