var mysql = require('mysql')
// Let’s make node/socketio listen on port 3000
var io = require('socket.io').listen(3003)
// Define our db creds
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: '2244'
})

// Log any errors connected to the db
db.connect(function (err) {
    if (err) console.log(err)
})

// Define/initialize our global vars
var notes = []
var isInitNotes = false
var socketCount = 0
global.new_id = 0;
global.new_id_new = 0;
io.sockets.on('connection', function (socket) {
    setInterval(function () {
        db.query('SELECT id FROM emails ORDER BY id DESC LIMIT 1', function (err, row) {
            if (err) throw err;
            global.new_id = row[0].id;
            console.log(global.new_id_new, global.new_id);
            if (new_id_new != new_id) {
                global.new_id_new = global.new_id;
                db.query('SELECT * FROM emails ORDER BY id DESC LIMIT 100', function (err, rows) {
                    if (err) throw err;
                    console.log('Data received from Db:\n');
                    console.log(rows);
                    socket.emit('showrows', rows);
                });

            }
        });
    }, 2000);

})
