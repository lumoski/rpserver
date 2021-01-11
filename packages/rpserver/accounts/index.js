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

mp.events.add('playerReady', player => {
    player.call('showLoginDialog');
});

mp.events.add('onLoginAttempt', (player, data) => {
    data = JSON.parse(data);
    DB.query('SELECT * FROM accounts WHERE login = ? LIMIT 1', [data.login], function(err, result){
        if (result.length == 0) return player.call('showAuthError', ['Invalid login/password']);
        const dbPassword = result[0].password;
        if (data.password == dbPassword) {
            return player.call('hideLoginDialog');
        } else {
            player.call('showAuthError', ['Invalid login/password']);
        }
    });
});