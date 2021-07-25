//@ts-check

/*
GET /posts  = 포스팅 된 글 불러오기
GET /posts/:id = 특정 글 불러오기
POST /posts = 포스팅하기
*/

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef APiResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST' | 'DELETE'} method
 * @property {(matches: string[], body: Object.<string, *> | undefined) => Promise<APiResponse>} callback
 */

const fs = require('fs');

/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile('database.json', 'utf-8');
  return JSON.parse(json).posts;
}

/**
 * @param {Post[]} posts
 */
async function savePost(posts) {
  const content = {
    posts,
  };

  return await fs.promises.writeFile('database.json', JSON.stringify(content));
}

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: await getPosts(),
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1];
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      const posts = await getPosts();

      // @ts-ignore
      const post = posts.find((_post) => _post.id === postId);

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      return {
        statusCode: 200,
        body: post,
      };
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */

      if (!body) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      if (!body.title || !body.content) {
        return {
          statusCode: 404,
          body: 'Form is wrong',
        };
      }

      const newPost = {
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      };

      const posts = await getPosts();
      posts.push(newPost);
      savePost(posts);

      return {
        statusCode: 200,
        body: newPost,
      };
    },
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'DELETE',
    callback: async (matches) => {
      const postId = matches[1];

      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      const posts = await getPosts();
      const postIdx = posts.findIndex((post) => post.id === postId);

      console.log(postIdx);

      if (postIdx === -1) {
        return {
          statusCode: 404,
          body: 'Not found',
        };
      }

      posts.splice(postIdx, 1);
      savePost(posts);

      return {
        statusCode: 200,
        body: posts,
      };
    },
  },
];

module.exports = {
  routes,
};
