// Importation du package Nodejs
const http = require('http');
// Importation de l'application express
const app = require ('./app');

// Application de la fonction normalizePort qui renvoie un port valide
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};
  
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// La fonction errorHandler recherche les différentes erreurs et les gère
// Enrégistrement dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Création du serveur avec la méthode createServer
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// on écoute le port sur lequel le serveur s'exécute dans la console
server.listen(port);


