/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Level } from '../../../interfaces/interfaces'
import './order.css'

class Order {
  public render(level: Level): void {
    const { document } = window
    const order: Element | null = document.querySelector('.order') as Element

    order.textContent = level.doThis
  }
}

export default Order
