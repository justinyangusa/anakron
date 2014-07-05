window.addEventListener("load", function() {
    var login = document.getElementById("login");
    var nick = document.getElementById("nick");

    var gameStarted = false;
    nick.addEventListener("change", function() {
        if (this.value.length > 5 && !this.value.match(/[^a-zA-Z0-9_]/) && !gameStarted) {
            gameStarted = true;
            runGame(this, login);
        } else {
            this.style.backgroundColor = "red";
        }
    });
});

function runGame(nick, login) {
    console.log(nick);

    var name = nick.value;
    //login.style.display = "none";
    document.body.removeChild(login);
    document.getElementById("main").style.display = "block";

    var stdin = document.getElementById("stdin");
    stdin.focus();
    var stdout = document.getElementById("console");

    var ws = new WebSocket(window.location.origin.replace(/^https?/, "ws"));
    function log(dat, classes) {
        var parent = document.createElement("div");
        parent.className = "log " + (classes || []).join(" ");
        parent.innerHTML = dat.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        stdout.appendChild(parent);

        function getDocHeight() {
            var D = document;
            return Math.max(
                D.body.scrollHeight, D.documentElement.scrollHeight,
                D.body.offsetHeight, D.documentElement.offsetHeight,
                D.body.clientHeight, D.documentElement.clientHeight
            );
        }

        window.scroll(0, getDocHeight());
    }

    log("Trying to connect to Anakron...");

    ws.onopen = function(e) {
        log("Connected to Anakron.");
        ws.send(JSON.stringify({"name": name, "action":"join"}));
    }

    ws.onmessage = function(e) {
        var p = JSON.parse(e.data);
        if (p.type === "social") {
            log(p.data, ["chat"]);
        } else {
            log(p.data, ["response"]);
        }
    };

    ws.onerror = ws.onclose = function(e) {
        log("The connection to Anakron seems to have died. Your best bet is to refresh the page. Like, now.", ["error"]);
        stdin.disabled = true;
    }

    stdin.addEventListener("change", function() {
        log(this.value);
        if (this.value.charAt(0) === "/" && this.value.length < 141 && this.value.length > 2) {
            ws.send(JSON.stringify({"action":"speak", "text": this.value.substring(1).replace(/^\s+|\s+$/g, '') }));
        } else if (this.value.charAt(0) === "!") {
            ws.send(JSON.stringify({"action":"admin", "phrase": this.value.substring(1).replace(/^\s+|\s+$/g, '') }));
        } else {
            ws.send(JSON.stringify({"action":"do", "phrase": this.value}));
        }
        this.value = "";
    });
}