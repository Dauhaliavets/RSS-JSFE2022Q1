import { Product } from '../models/model.types';
import { Control } from '../controllers/Control';
import { Controller } from '../controllers/controller';

export class Card extends Control<HTMLElement> {
  title: Control<HTMLElement>;
  image: Control<HTMLImageElement>;
  price: Control<HTMLElement>;
  brand: Control<HTMLElement>;
  description: Control<HTMLElement>;
  buttonRemove: Control<HTMLElement>;
  buttonAdd: Control<HTMLElement>;

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

    this.price = new Control(this.node, 'span', 'card__item-price', `${data.price}`);
    this.buttonRemove = new Control(this.node, 'button', 'card__item-button__remove', 'Remove from cart');
    this.buttonAdd = new Control(this.node, 'button', 'card__item-button__add', 'Add to cart');

    this.buttonRemove.node.onclick = () => controller.removeFromCart(data.id);
    this.buttonAdd.node.onclick = () => controller.addToCart(data);
  }
}
