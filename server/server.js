var mysql = require('mysql')
// Let’s make node/socketio listen on port 3000
var io = require('socket.io').listen(3003)
// Define our db creds
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'shop',
    password: ''
})

// Log any errors connected to the db
db.connect(function (err) {
    if (err) console.log(err)
});
// Define/initialize our global vars
var notes = []
var isInitNotes = false
var socketCount = 0
global.new_id = 0;
global.new_id_new = 0;
global.arr = [];
io.sockets.on('connection', function (socket) {
    socket.emit('echo', 'server send message');
    setInterval(function () {
        db.query('SELECT ID FROM device_log ORDER BY ID DESC LIMIT 1', function (err, row) {
            if (err) throw err;
            socket.emit('echo', global.arr);
            global.new_id = row[0].ID;
            console.log(global.new_id_new, global.new_id);
            if (new_id_new != new_id) {
                socket.emit('echo', row[0].ID + ' --- --- \n');
                global.new_id_new = global.new_id;
                db.query('SELECT * FROM device_log ORDER BY ID DESC LIMIT 100', function (err, rows) {
                    if (err) throw err;
                    console.log('Data received from Db:\n');
                    console.log(rows);
                    global.arr = rows;
                    socket.emit('echo', rows);
                    //socket.emit('showrows', rows);
                });
            }
        });
    }, 2000);
    console.log('connected2');
});
