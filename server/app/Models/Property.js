'use strict'

const Model = use('Model')
const Database = use('Database')

class Property extends Model {
  static scopeNearBy (query, latitude, longitude, distance) {
    const haversine = `(6371 * acos(cos(radians(${latitude}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${longitude}))
      + sin(radians(${latitude}))
      * sin(radians(latitude))))`

    return query
      .select('*', Database.raw(`round(${haversine}) as distance`))
      .whereRaw(`${haversine} < ${distance}`)
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = Property
