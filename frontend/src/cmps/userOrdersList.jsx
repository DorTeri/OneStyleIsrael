import React from 'react'
import { userOrderPreview } from './userOrderPreview'

export function userOrdersList({ orders }) {
  return (
    <section className='orders-list'>
        Orders list
        {orders.map(o => <userOrderPreview order={o} />)}
    </section>
  )
}
