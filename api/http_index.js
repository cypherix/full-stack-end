const http = require('http');
const cors = require('cors');
const PORT = 3000;

const handleCors = cors();

const server = http.createServer((req, res) => {
  handleCors(req, res, () => {});

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (req.method === 'POST' && req.url === '/users') {
    handleAddUser(req, res);
  } else if (req.method === 'PUT' && req.url.startsWith('/users/')) {
    handleUpdateUser(req, res);
  } else if (req.method === 'DELETE' && req.url.startsWith('/users/')) {
    handleDeleteUser(req, res);
  } else {
    if (!res.headersSent) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

let users = [
  { id: 1, name: 'default', email: 'default@default.com', age: 30, gender: 'male' },
];

function handleAddUser(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const newUser = JSON.parse(body);
      newUser.id = users.length + 1;
      users.push(newUser);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
      console.log(`Added user with email ${newUser.email}`);
    } catch (error) {
      console.error('Error parsing request body:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to add user.' }));
    }
  });
}

function handleUpdateUser(req, res) {
  const userEmail = req.url.split('/')[2];
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const updateUser = JSON.parse(body);
      users = users.map(user => (user.email === userEmail ? { ...user, ...updateUser } : user));
      const updatedUser = users.find(user => user.email === userEmail);
      if (updatedUser) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
        console.log(`Updated user with email ${userEmail}`);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User not found.' }));
      }
    } catch (error) {
      console.error('Error parsing request body:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to update user.' }));
    }
  });
}

function handleDeleteUser(req, res) {
  const userEmail = req.url.split('/')[2];
  users = users.filter(user => user.email !== userEmail);
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end();
  console.log(`Deleted user with email ${userEmail}`);
}
