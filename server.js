const express = require('express');

const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');

const makeRouter = require('./middlewares/makeRouter');

const server = express();

server.use('/api/actions', makeRouter('project', 'name, and description, and completed', actionModel));
server.use('/api/projects', makeRouter('action', 'project_id, description, notes, and completed', projectModel));

server.listen(8000, () => console.log('Listening on Port 8000'));
