import { Product } from '../models/model.types';
import { Control } from '../controllers/Control';
import { Controller } from '../controllers/controller';

export class Card extends Control<HTMLElement> {
  title: Control<HTMLElement>;
  image: Control<HTMLImageElement>;
  price: Control<HTMLElement>;
  brand: Control<HTMLElement>;
  description: Control<HTMLElement>;
  buttonRemove: Control<HTMLElement> | undefined;
  buttonAdd: Control<HTMLElement> | undefined;
  oldPrice: Control<HTMLElement> | undefined;
  newPrice: Control<HTMLElement>;
  buttons: Control<HTMLElement>;
  indicator: Control<HTMLElement> | undefined;

  constructor(parentElement: HTMLElement, data: Product, controller: Controller) {
    super(parentElement, 'div', 'card__item');

    this.image = new Control(this.node, 'img', 'card__item-image');
    this.image.node.src = data.img;
    this.brand = new Control(this.node, 'span', 'card__item-brand', data.brand);
    this.title = new Control(this.node, 'h3', 'card__item-title', data.title);
    this.description = new Control(this.node, 'div', 'card__item-description');

    for (const key in data.description) {
      new Control(this.description.node, 'p', 'card__item-description__item', `${key}${data.description[key]}`);
    }

    this.price = new Control(this.node, 'div', 'card__item-price');
    if (data.discount) {
      const priceWithoutDiscount = Number(data.price + (data.price / 100) * data.discount).toFixed(2);
      this.oldPrice = new Control(this.node, 'span', 'card__item-price-old', `${data.price} BYN`);
      this.newPrice = new Control(this.node, 'span', 'card__item-price-new', `${priceWithoutDiscount} BYN`);
      this.price.node.append(this.oldPrice.node, this.newPrice.node);
    } else {
      this.newPrice = new Control(this.node, 'span', 'card__item-price-new', `${data.price} BYN`);
      this.price.node.append(this.newPrice.node);
    }

    this.buttons = new Control(this.node, 'div', 'card__item-buttons-container');

    if (controller.isInCart(data)) {
      this.indicator = new Control(this.node, 'span', 'card__item-indicator', 'В корзине');
      this.buttonRemove = new Control(this.buttons.node, 'button', 'button__remove', 'Remove');
      this.buttonRemove.node.onclick = () => controller.removeFromCart(data.id);
    } else {
      this.buttonAdd = new Control(this.buttons.node, 'button', 'button__add', 'Add to Cart');
      this.buttonAdd.node.onclick = () => controller.addToCart(data);
    }
  }
}
