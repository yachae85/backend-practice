//  @ts-check

const http = require('http');
const { resolve } = require('path');
const { routes } = require('./api');

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    );

    if (!req.url || !route) {
      res.statusCode = 404;
      res.end('Not found.');
      return;
    }

    const regexResult = route.url.exec(req.url);

    if (!regexResult) {
      res.statusCode = 404;
      res.end('Not found.');
      return;
    }

    /**@type {Object<string, *> | undefined} */
    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8');
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data));
            } catch {
              reject(new Error('Ill-formed json'));
            }
          });
        }))) ||
      undefined;

    const result = await route.callback(regexResult, reqBody);
    res.statusCode = result.statusCode;

    if (typeof result.body === 'string') {
      res.end(result.body);
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(result.body));
    }
  }

  main();

  // const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
  // const postIdRegexResult =
  //   (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined;
  // if (req.url === '/posts' && req.method === 'GET') {
  //   const result = {
  //     posts: posts.map((post) => ({
  //       id: post.id,
  //       title: post.title,
  //     })),
  //     totalCount: posts.length,
  //   };
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //   res.end(JSON.stringify(result));
  // } else if (postIdRegexResult && req.method === 'GET') {
  //   const postId = postIdRegexResult[1];
  //   const post = posts.find((_post) => _post.id === postId);
  //   if (post) {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     res.end(JSON.stringify(post));
  //   } else {
  //     res.statusCode = 404;
  //     res.end('Post not found.');
  //   }
  // } else if (req.url === '/posts' && req.method === 'POST') {
  //   req.setEncoding('utf-8');
  //   req.on('data', (data) => {
  //     /**
  //      * @typedef CreatePostBody
  //      * @property {string} title
  //      * @property {string} content
  //      */
  //     /**@type {CreatePostBody} */
  //     const body = JSON.parse(data);
  //     posts.push({
  //       id: body.title.toLowerCase().replace(/\s/g, '_'),
  //       title: body.title,
  //       content: body.content,
  //     });
  //   });
  //   res.statusCode = 200;
  //   res.end('Creating post');
  // } else {
  //   res.statusCode = 404;
  //   res.end('Not found');
  // }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`);
});
