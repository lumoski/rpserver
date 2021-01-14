const mysql = require('mysql');
let DB = false;

mp.events.add('packagesLoaded', () => {
    DB = mysql.createConnection({
        host        : 'localhost',
        user        : 'mysql',
        password    : 'mysql',
        database    : 'rpserver'
    });

    DB.connect(function(err){
        if (err) return console.log(`Connection Error: ${err.stack}`);
        console.log(`Connected as id ${DB.threadId}`);
    });
});

mp.events.addCommand('login', (player, fText, login, password) => {
    if (!login || !password) return player.outputChatBox('/login [login] [password]');

});

mp.events.addCommand('register', (player, fText, login, password, rpassword) => {
    if (!login || !password || !rpassword) return player.outputChatBox('/login [login] [password] [repeat password]');
    if (password != rpassword) return player.outputChatBox('Passwords are not the same!');
    DB.query('INSERT INTO accounts (login, password) VALUES (?, ?)', [login, rpassword], (e) => {
        if (e) {
            player.notify('~r~An error has occurred!');
            console.log(`Register error: ${e}`);
        } else {
            player.notify('~g~Successful registration!');
        }
    });
});