const http = require('http');

/*
GET /posts  = 포스팅 된 글 불러오기
GET /posts/:id = 특정 글 불러오기
POST /posts = 포스팅하기
*/

const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined;

  if (req.url === '/posts' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('List of posts');
  } else if (postIdRegexResult) {
    const postId = postIdRegexResult[1];
    res.statusCode = 200;
    console.log(postId);
    res.end('Some content of the post');
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200;
    res.end('Creating post');
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`);
});
