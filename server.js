var WebSocketServer = require('ws').Server,
    http = require('http'),
    express = require('express'),
    app = express(),
    World = require('./runtime'),
    english = require('./english');


function choice() {
    return arguments[Math.floor(arguments.length*Math.random())];
}

app.use(express.static(__dirname + '/static'));

var server = http.createServer(app);
server.listen(process.env.PORT || 8080);



function social(str) {
    return JSON.stringify({
        type:"social",
        data:str
    });
}
function story(str) {
    return JSON.stringify({
        type:"story",
        data:str
    });
}

var ignoreError = function(err) {
    if (err) {
        console.log("Something significant broke.");
        console.log(err);
    }
};


var BAD_USERNAMES = []; // THESE PEOPLE ARE SPAMMERZ.


var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {

    ws.send(social("Currently online: " + wss.clients.map(function(cl) {return "["+(cl.name || 
        "you")+"]"}).join(" ")), ignoreError);

    ws.on('message', function(data) {
        var payload;
        try {
            payload = JSON.parse(data);
        } catch(e) {
            //
        }
        if (payload.action === "join") {
            if (payload.name.substring(1) === "scratch") {
                payload.name = payload.name.charAt(0);
            }
            broadcast(social(payload.name + " has joined - " + wss.clients.length + " people are here."));
            ws.name = payload.name;

            if (BAD_USERNAMES.indexOf(ws.name) !== -1) {
                ws.send(social("Turns out we've banned this username for spamming. Sorry!"));
                ws.close();
            }

        } else if (payload.action === "speak") {
            broadcast(social(ws.name + ": " + payload.text));
        } else if (payload.action === "do") {

            var phrase = new english().feed(payload.phrase.toLowerCase()).results[0];
            if (phrase) {
                var target = phrase.object ? World.objects[phrase.object] : World;
                if (target && target.actions[phrase.verb]) {
                    broadcast(story(ws.name + " => " + payload.phrase));
                    function minifypp(pp) {
                        var out = {};
                        pp.forEach(function(p) {out[p.preposition] = p.object});
                        return out;
                    }
                    broadcast(story(target.actions[phrase.verb].call(target, minifypp(phrase.prepositionalphrases || []), World)));
                } else {
                    ws.send(story(choice("That was not a good idea.", "Why would you do such a thing?", "I don't know what your intentions are.", "I refuse to commit such a deed.", "How dare you?!", "I'm not sure that makes sense.")), ignoreError);
                }
            } else {
                ws.send(story(choice("Hmm? Didn't quite hear you.", "You should use good grammar.", "I am only an egg, but that made no sense to me.", "Please talk in English.", "I lost you after the first word.", "Beg pardon?")), ignoreError);
            }
        } else if (payload.action === "admin") {
            var phrase = new english().feed(payload.phrase.toLowerCase()).results[0];
            console.log(phrase, payload.phrase);
            if (phrase) {
                if (phrase.verb === "kick" && ws.name.length === 1) {
                    var person_to_kick = phrase.object;
                    var client_to_kick = wss.clients.filter(function(a) {return a.name === person_to_kick; })[0];
                    if (client_to_kick) {
                        client_to_kick.send(social("You are bad. We are kicking you. Peace for all."));
                        client_to_kick.close();
                    }
                    BAD_USERNAMES.push(person_to_kick);
                } else {
                    ws.send(story(choice("That was not a good idea.", "Why would you do such a thing?", "I don't know what your intentions are.", "I refuse to commit such a deed.", "How dare you?!", "I'm not sure that makes sense.")), ignoreError);
                }
            } else {
                ws.send(story(choice("Hmm? Didn't quite hear you.", "You should use good grammar.", "I am only an egg, but that made no sense to me.", "Please talk in English.", "I lost you after the first word.", "Beg pardon?")), ignoreError);
            }
        }
    });
    ws.on('close', function() {
        broadcast(social(ws.name + " has left - " + wss.clients.length + " people are left."));
    });
    ws.on('error', ignoreError);
});

function broadcast(payload) {
    wss.clients.forEach(function(ws) {
        ws.send(payload, ignoreError);
    });
}