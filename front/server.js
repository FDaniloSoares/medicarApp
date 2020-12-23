const express = require('express');
const path = require('path');

const app = express();

const publicDist = (process.env.NODE_ENV === 'gzipedBuild')
  ? path.join(__dirname, 'gzipped')
  : path.join(__dirname, 'dist');

const pathUrl = (process.env.NODE_ENV === 'gzipedBuild')
  ? '/gzipped/'
  : '/dist/';

if (process.env.NODE_ENV === 'gzippedBuild') {
  // eslint-disable-next-line global-require
  const expressStaticGzip = require('express-static-gzip');
  app.use(expressStaticGzip(publicDist));
}

app.use(express.static(publicDist));

app.use((req, res, next) => {
  if (!req.originalUrl.includes(pathUrl, 0)) {
    res.sendFile(path.join(publicDist, 'index.html'));
  } else {
    next();
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up on port: ${port}`);
});
