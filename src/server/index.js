import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
import * as workbox from 'workbox-build';

const app = express()

app.use(cors())
app.use(express.static("public"))
workbox.generateSW({ additionalManifestEntries: ["/"], cacheId: "spaceXpoc", globDirectory: "public/", globPatterns: ["**/*.{​​css,js}​​"], globIgnores: ["node_modules/**/*", "**/sw.js"], swDest: "public\\sw.js", runtimeCaching: [{ urlPattern: /^http:\/*/, handler: "StaleWhileRevalidate", options: { cacheName: "markup", expiration: { maxAgeSeconds: 60 * 60 * 24 * 7, }, }, }], clientsClaim: true, skipWaiting: true, });


app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>spaceXpoc</title>
          <link rel="manifest" href="manifest.json">
          <link rel="apple-touch-icon" href="/logo192.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <meta name="description" content="Web site created using reactJS"/>
          <meta name="theme-color" content="#000000"/>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
          <script>
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                  console.log('ServiceWorker registration failed: ', err);
                });
              });
            }
          </script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})