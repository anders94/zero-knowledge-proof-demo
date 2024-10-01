const express = require('express');
const bodyParser = require('body-parser');
const git = require('isomorphic-git');
const fs = require('fs');

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const host = process.env.HOST ? process.env.HOST : '0.0.0.0';

const routes = require('./routes');

(async () => {
    app.set('view engine', 'pug');
    app.set('trust proxy', true);
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    const http = require('http').createServer(app);
    const commit = await git.log({fs, dir: '.', depth: 1, ref: 'main'});

    app.use((req, res, next) => {
	res.locals.session = req.session;
	res.locals.formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
	res.locals.commit = commit[0].oid;
	console.log(req.ip, req.method, req.url);
	next();

    });

    app.use('/', routes);

    http.listen(port, host, () => {
	console.log(`Listening on ${host}:${port}`)

    });

})();
