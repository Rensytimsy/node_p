const {createServer} = require('node:http');
const path = require('path')
const fs = require ('fs')
const port = 8080;


const app = createServer((req, res) => {
    let filename = path.join(__dirname, "pages", req.url === "/" ? "index.html" : req.url);
    let extname = path.extname(filename);

    fs.readFile(filename, (err, data) => {
        if(err){
            if (err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname, "pages", "404.html"), (err, data) => {
                    if (err) throw err;
                    res.writeHead(404, {'Content-type' : 'text/html'})
                    res.end(data, 'utf-8')
                });
            }else{
                res.writeHead(500);
                res.end(err.code, 'utf-8')
            }
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html'})
            res.end(data, 'utf-8')
        }
    });

});

app.listen(port, () => console.log(`server running at --> https://localhost:${port}`));