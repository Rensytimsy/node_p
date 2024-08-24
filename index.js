const {createServer} = require('node:http');
const http = require('http')
const fs = require ('fs')

const port = 3000
const HOST = 'localhost'


const app = createServer((req, res) => {
    fs.readFile('page.html', (err, data) => {
        if (err){
            console.log(`Something went wrong while trying to access the file  ${err}`);
            throw err;
        }
        res.writeHead(200, {'Content-Type' : 'text/html'})
        res.write(data)
        res.end()
    });
})

app.listen(port, () => console.log(`server running  -->  http:${HOST}:${port}`))

