import { Controller } from './../controllers/controller';
import { Control } from '../controllers/Control';
import { AppState } from '../models/model.types';

export class Header extends Control<HTMLElement> {
  container: Control<HTMLElement>;
  logo: Control<HTMLElement>;
  searchInput: Control<HTMLElement>;
  cartBtn: Control<HTMLElement>;

  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'header', 'header');
    this.container = new Control(this.node, 'div', 'header__container container');
    this.logo = new Control(this.container.node, 'div', 'header__logo', 'LOGO');
    this.searchInput = new Control(this.container.node, 'input', 'header__input');
    this.cartBtn = new Control(this.container.node, 'div', 'header__button-cart', `Корзина ${data.cart.length}`);
    this.cartBtn.node.onclick = () => {
      controller.toggleIsOnCart()
    }
  }
}
