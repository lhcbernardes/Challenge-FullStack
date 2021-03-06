'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

Route.resource('properties', 'PropertyController')
  .apiOnly()
  .middleware('auth')

Route.get('post/:id', 'PostController.show').middleware('auth')
Route.post('properties/:id/posts', 'PostController.store').middleware('auth')
