const express = require('express');

const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');

const makeRouter = require('./middlewares/makeRouter');

const server = express();

server.get('/api/projects/:id/actions', async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await projectModel.getProjectActions(Number(id));
    res.status(200).json(payload);
  } catch {
    res.status(500).json('Database was not able to fulfill this request. Please ensure you are requesting actions' +
  'of an existing project');
  }

  
})
server.use('/api/actions', makeRouter('project', 'name, and description, and completed', actionModel));
server.use('/api/projects', makeRouter('action', 'project_id, description, notes, and completed', projectModel));

server.listen(8000, () => console.log('Listening on Port 8000'));
