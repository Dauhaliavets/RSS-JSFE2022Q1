import { Product } from '../models/model.types';
import { Control } from '../controllers/Control';
import { Controller } from '../controllers/controller';

export class Card extends Control<HTMLElement> {
  title: Control<HTMLElement>;
  image: Control<HTMLImageElement>;
  price: Control<HTMLElement>;
  brand: Control<HTMLElement>;
  buttonRemove: Control<HTMLElement> | undefined;
  buttonAdd: Control<HTMLElement> | undefined;
  oldPrice: Control<HTMLElement> | undefined;
  buttons: Control<HTMLElement>;
  new: Control<HTMLElement> | undefined;
  year: Control<HTMLElement>;
  count: Control<HTMLElement>;
  category: Control<HTMLElement>;
  popular: Control<HTMLElement> | undefined;

  constructor(parentElement: HTMLElement, data: Product, controller: Controller) {
    super(parentElement, 'div', 'card__item');

    this.image = new Control(this.node, 'img', 'card__item-image');
    this.image.node.src = data.img;
    this.title = new Control(this.node, 'h3', 'card__item-title', data.title);
    this.category = new Control(this.node, 'span', 'card__item-categiry', `Категория: ${data.category}`);
    this.brand = new Control(this.node, 'span', 'card__item-brand', `Бренд: ${data.brand}`);

    this.year = new Control(this.node, 'div', 'card__item-year', `Год выпуска: ${data.year}`);
    this.count = new Control(this.node, 'div', 'card__item-count', `Количество: ${data.count}`);

    this.price = new Control(this.node, 'div', 'card__item-price', `${data.price} BYN`);
    this.buttons = new Control(this.node, 'div', 'card__item-buttons-container');

    if (data.isPopular) {
      this.popular = new Control(this.node, 'div', 'card__item-star');
    }
    if (data.isNew) {
      this.new = new Control(this.node, 'span', 'card__item-indicator', 'NEW');
    }

    if (controller.isInCart(data)) {
      this.buttonRemove = new Control(this.buttons.node, 'button', 'button__remove', 'Remove');
      this.buttonRemove.node.onclick = () => controller.removeFromCart(data.id);
    } else {
      this.buttonAdd = new Control(this.buttons.node, 'button', 'button__add', 'Add to Cart');
      this.buttonAdd.node.onclick = () => controller.addToCart(data);
    }
  }
}
