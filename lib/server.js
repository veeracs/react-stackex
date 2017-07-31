import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
const ReactRouter = require('react-router')
import routes from '../build/server.routes.bundle.js'


const app = express()
// setup gzip/deflate compression
app.use(compression())

// serve our static stuff
app.use(express.static(path.join(__dirname, '..', 'public')))

// send all requests to index.html so browserHistory in React Router works
app.get("*", function (req, res) {
    // match the routes to the url
    ReactRouter.match({ routes: routes, location: req.url }, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            const appHtml = ReactDOMServer.renderToString(React.createFactory(ReactRouter.RouterContext)( Object.assign({},props)))
            res.send(renderPage(appHtml))
        } else {
            res.status(404).send('Not Found')
        }
    })
})

function renderPage(appHtml) {
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>React StackEx</title>
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script src="/build/bundle.js"></script>
      </body>
    </html>
    `
}

let PORT = process.env.PORT || 5000
const httpServer = require('http').createServer(app);

httpServer.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})

