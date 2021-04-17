const fs = require("fs");
const http = require("http");
const url = require("url");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf8");
const overview = fs.readFileSync(
    `${__dirname}/templates/overview.html`,
    "utf8"
);
const single = fs.readFileSync(`${__dirname}/templates/single.html`, "utf8");

const replaceTemplate = (single, el) => {
    let output = single
        .replace(/{%PRODUCTNAME%}/g, el.productName)
        .replace(/{%IMAGE%}/g, el.image)
        .replace(/{%FROM%}/g, el.from)
        .replace(/{%NUTRIENTS%}/g, el.nutrients)
        .replace(/{%QUANTITY%}/g, el.quantity)
        .replace(/{%DESCRIPTION%}/g, el.description)
        .replace(/{%PRICE%}/g, el.price)
        .replace(/{%ID%}/g, el.id)
        .replace(/{%NOT_ORGANIC%}/g, !el.organic && "not-organic");
    return output;
};

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;

    if (path === "/overview" || path === "/") {
        res.writeHead(404, { "Content-type": "text/html" });

        const cards = dataObj.map((el) => replaceTemplate(single, el)).join(' ');

        const out = overview.replace(/{%PRODUCT_CARDS%}/g, cards);

        res.end(out);
    } else if (path === "/product") {
        const id = +url.parse(req.url, true).query.id;

        const out = replaceTemplate(product, dataObj.find(el => el.id === id));

        res.end(out);
    } else if (path === "/api") {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(data);
    } else {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>Not found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Started");
});
