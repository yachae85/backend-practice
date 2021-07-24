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

/** @type {Post[]} */
const posts = [
  { id: 'my_first_post', title: 'My first post', content: 'Hello!' },
  { id: 'my_second_post', title: 'My 두 번쩨 post', content: 'Second post!' },
];

/**
 * @typedef APiResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches: string[], body: Object.<string, *> | undefined) => Promise<APiResponse>} callback
 */

/**@type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: posts,
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

      const newPost = {
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      };

      posts.push(newPost);

      return {
        statusCode: 200,
        body: newPost,
      };
    },
  },
];

module.exports = {
  routes,
};
