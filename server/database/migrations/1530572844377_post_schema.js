'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', table => {
      table.increments()
      table
        .integer('property_id')
        .references('id')
        .inTable('properties')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title', 80).notNullable()
      table.string('coment', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
