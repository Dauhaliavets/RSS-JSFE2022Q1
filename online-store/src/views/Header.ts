import { Controller } from './../controllers/controller';
import { Control } from '../controllers/Control';
import { AppState } from '../models/model.types';

export class Header extends Control<HTMLElement> {
  container: Control<HTMLElement>;
  logo: Control<HTMLElement>;
  searchInput: Control<HTMLInputElement>;
  cartBtn: Control<HTMLElement>;
  cartIcon: Control<HTMLElement>;
  cartCount: Control<HTMLElement>;
  searchInputWrapper: Control<HTMLElement>;
  searchClear: Control<HTMLElement> | undefined;

  constructor(parentElement: HTMLElement, data: AppState, controller: Controller) {
    super(parentElement, 'header', 'header');
    this.container = new Control(this.node, 'div', 'header__container container');
    this.logo = new Control(this.container.node, 'div', 'header__logo');
    this.searchInputWrapper = new Control(this.container.node, 'div', 'header__input-wrapper');
    this.searchInput = new Control(this.searchInputWrapper.node, 'input', 'header__input');
    this.searchInput.node.value = data.searchValue;
    this.searchInput.node.placeholder = 'Поиск товара...';
    this.searchInput.node.autocomplete = 'off';
    this.searchInput.node.focus();
    this.searchInput.node.oninput = () => controller.setSearchValue(this.searchInput.node.value);
    if (data.searchValue.length) {
      this.searchClear = new Control(this.searchInputWrapper.node, 'div', 'header__clear-input');
      this.searchClear.node.onclick = () => controller.clearSearchValue();
    }
    this.cartBtn = new Control(this.container.node, 'div', 'header__button-cart');
    this.cartIcon = new Control(this.cartBtn.node, 'div', 'header__button-cart-icon');
    this.cartCount = new Control(this.cartBtn.node, 'div', 'header__button-cart-count', `${data.cart.length}`);
    this.cartBtn.node.onclick = () => controller.toggleIsOnCart();
  }
}
