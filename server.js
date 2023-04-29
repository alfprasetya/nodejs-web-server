// 1. import http
const http = require('http');

// 2. create request listener
const requestListener = (request, response) => {
    // response.setHeader('Content-type', 'text/html');
    response.setHeader('Content-type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            // response.end('<h1>Halo! Ini adalah homepage!</h1>');
            response.end(
                JSON.stringify({
                    message: 'Halo! Ini adalah homepage.',
                })
            );
        } else {
            response.statusCode = 400;
            // response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request!</h1>`);
            response.end(
                JSON.stringify({
                    message: `Halaman ini tidak dapat diakses dengan ${method} request!`,
                })
            );
        }
    } else if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            // response.end('<h1>Halo, ini adalah halaman about!</h1>');
            response.end(
                JSON.stringify({
                    message: 'Halo! ini adalah halaman about!',
                })
            );
        } else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);

                response.statusCode = 200;
                // response.end(`<h1>Halo, ${name}! Ini adalah halaman about`);
                response.end(
                    JSON.stringify({
                        message: `Halo ${name}! Ini adalah halaman about!`,
                    })
                );
            });
        } else {
            response.statusCode = 400;
            // response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
            response.end(
                JSON.stringify({
                    message: `Halaman ini tidak dapat diakses menggunakan ${method} request!`,
                })
            );
        }
    } else {
        response.statusCode = 404;
        // response.end('<h1>Halaman tidak ditemukan!</h1>');
        response.end(
            JSON.stringify({
                message: 'Halaman tidak ditemukan!',
            })
        );
    }
};

// 3. create server
const server = http.createServer(requestListener);

// 4. define port and host
const port = 5000;
const host = 'localhost';

// 5. handle request
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
