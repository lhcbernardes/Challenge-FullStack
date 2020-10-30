'use strict'

const Model = use('Model')

class Post extends Model {
  property () {
    return this.belongsTo('App/Models/Property')
  }
}

module.exports = Post
