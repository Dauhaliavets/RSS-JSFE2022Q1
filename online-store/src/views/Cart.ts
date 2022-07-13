import { Controller } from './../controllers/controller';
import { Control } from '../controllers/Control';
import { AppState, Product } from '../models/model.types';
import { Card } from './Card';

export class Cart extends Control<HTMLElement> {
  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'div', 'cart__container');
    if (data.cart.length > 0) {
      data.cart.map((product: Product) => new Card(this.node, product, controller));
    } else {
      this.node.textContent = 'В корзине нет товаров';
    }
  }
}
