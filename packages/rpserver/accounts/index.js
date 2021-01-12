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

});

mp.events.addCommand('register', (player, fText, login, password, rpassword) => {
    
});