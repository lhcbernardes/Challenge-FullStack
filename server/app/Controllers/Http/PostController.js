'use strict'

const Post = use('App/Models/Post')
const Property = use('App/Models/Property')
/**
 * Resourceful controller for interacting with post
 */
class PostController {
  async show ({ params }) {
    const post = await Post.findOrFail(params.id)

    return post
  }

  /**
   * Create/save a new post.
   * POST post
   */
  async store ({ params, request }) {
    const property = await Property.findOrFail(params.id)
    const data = request.only([
      'title',
      'coment'
    ])

    const post = await Post.create({ ...data, property_id: property })

    return post
  }
}

module.exports = PostController
