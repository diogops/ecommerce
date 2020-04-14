'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
      table.increments()
      table.integer('order_id').unsigned()
      table.integer('product_id').unsigned()
      table.decimal('quantity', 12,2).defaultTo(0)
      table.decimal('subtotal', 12,2).defaultTo(0)
      table.timestamps()

      table.foreign('order_id').references('id').inTable('orders').onDelete('cascade')
      table.foreign('product_id').references('id').inTable('products').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
