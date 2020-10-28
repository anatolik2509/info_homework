bodyParser = require("body-parser").json();

module.exports = function (app){
    app.get('/announcements/quantity', function (req, res){
        const {Client} = require('pg');
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'itis2020',
            database: 'Desk_Site_DB'
        });

        (async () => {
            await client.connect()
            let response = await client.query('SELECT COUNT(*) FROM announcements;')
            await client.end()
            res.send({'count' : response.rows[0]['count']})
            res.end()
        })()
    })

    app.get('/announcements', function (req, res){
        const {Client} = require('pg');
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'itis2020',
            database: 'Desk_Site_DB'
        });
        let page = req.query.page
        let anno_count = req.query.anno_count;
        (async () => {
            await client.connect()
            let response = await client.query('SELECT * FROM announcements;')
            await client.end()
            response = response.rows.reverse()
            res.send(response.slice((page - 1) * anno_count, Math.min(page * anno_count, response.length)))
            res.end()
        })()
    })

    app.post('/add_announcement', bodyParser, function (req, res) {
        const {Client} = require('pg');
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'itis2020',
            database: 'Desk_Site_DB'
        });
        (async () => {
            await client.connect()
            const insert_query = 'INSERT INTO announcements(header,text,time,urgency) VALUES ($1, $2, now(), $3);'
            await client.query(insert_query, [req.body['header'], req.body['text'], req.body['urgency']])
            await client.end()
            res.end()
        })()
    })

}