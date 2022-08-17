var pg = require('pg');
var conString = "postgres://gdrvrphexuocwy:9123f4f7d12e6b6800bbb0d3d951301c08cd481b0f26dc718618c3ef6d343f37@ec2-52-207-15-147.compute-1.amazonaws.com:5432/dd66hoifpis9ld";

var client = new pg.Client({
    connectionString: conString,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

client.query("CREATE TABLE Attempts ( username TEXT, word TEXT, attempts INT)"
);

// client.query("CREATE TABLE Scores ( username TEXT, score INT)"
// ); 