import { Signal } from '../controllers/Signal';
import { AppState, Product } from './model.types';

const initialState: AppState = {
  products: [
    {
      id: 1,
      brand: 'Lenovo',
      category: 'Laptop',
      title: '14" Ноутбук Lenovo IdeaPad 1 14IGL05, Intel Celeron N4020 (1.1 ГГц)',
      description: {
        'Процессор: ': 'Intel Celeron N4020 (1.1 ГГц)',
        'Оперативная память: ': '4 ГБ',
        'Общий объем SSD, ГБ: ': '128',
        'Видеокарта: ': 'Intel UHD Graphics 605',
        'Операционная система: ': 'Windows Home',
      },
      price: 1150.21,
      img: 'https://cdn1.ozone.ru/s3/multimedia-j/wc250/6127326511.jpg',
      count: 0,
    },
    {
      id: 2,
      brand: 'Lenovo',
      category: 'Laptop',
      title: '14" Ноутбук Lenovo IdeaPad 3 14ITL6, Intel Pentium Gold 7505 (2.0 ГГц)',
      description: {
        'Процессор: ': 'Intel Pentium Gold 7505 (2.0 ГГц)',
        'Оперативная память: ': '8 ГБ',
        'Общий объем SSD, ГБ: ': '256',
        'Видеокарта: ': 'Intel UHD Graphics',
        'Операционная система: ': 'Без системы',
      },
      price: 1470.9,
      img: 'https://cdn1.ozone.ru/s3/multimedia-f/wc250/6074115303.jpg',
      count: 0,
    },
    {
      id: 3,
      brand: 'IRBIS',
      category: 'Laptop',
      title: '13.3" Ноутбук IRBIS NB71, Intel Atom Z3735F (1.33 ГГц)',
      description: {
        'Процессор: ': 'Intel Atom Z3735F (1.33 ГГц)',
        'Оперативная память: ': '2 ГБ',
        'Общий объем eMMC, ГБ: ': '32',
        'Видеокарта: ': 'Intel HD Graphics',
        'Операционная система: ': 'Windows Home',
      },
      price: 520.45,
      img: 'https://cdn1.ozone.ru/s3/multimedia-0/wc250/6162374076.jpg',
      count: 0,
    },
    {
      id: 4,
      brand: 'Haier',
      category: 'Laptop',
      title: '15.6" Ноутбук Haier U1520EM, Intel Celeron N4020 (1.1 ГГц)',
      description: {
        'Процессор: ': 'Intel Celeron N4020 (1.1 ГГц)',
        'Оперативная память: ': '4 ГБ',
        'Общий объем eMMC, ГБ: ': '64',
        'Видеокарта: ': 'Intel HD Graphics 600',
        'Операционная система: ': 'Windows Home',
      },
      price: 932.47,
      img: 'https://cdn1.ozone.ru/s3/multimedia-a/wc250/6141818158.jpg',
      count: 0,
    },
    {
      id: 5,
      brand: 'Lenovo',
      category: 'Laptop',
      title: '14" Ноутбук Lenovo IdeaPad 1 14IGL05, Intel Celeron N4020 (1.1 ГГц)',
      description: {
        'Процессор: ': 'Intel Celeron N4020 (1.1 ГГц)',
        'Оперативная память: ': '4 ГБ',
        'Общий объем SSD, ГБ: ': '128',
        'Видеокарта: ': 'Intel UHD Graphics 605',
        'Операционная система: ': 'Windows Home',
      },
      price: 1150.21,
      img: 'https://cdn1.ozone.ru/s3/multimedia-j/wc250/6127326511.jpg',
      count: 0,
    },
    {
      id: 6,
      brand: 'Lenovo',
      category: 'Laptop',
      title: '14" Ноутбук Lenovo IdeaPad 3 14ITL6, Intel Pentium Gold 7505 (2.0 ГГц)',
      description: {
        'Процессор: ': 'Intel Pentium Gold 7505 (2.0 ГГц)',
        'Оперативная память: ': '8 ГБ',
        'Общий объем SSD, ГБ: ': '256',
        'Видеокарта: ': 'Intel UHD Graphics',
        'Операционная система: ': 'Без системы',
      },
      price: 1470.9,
      img: 'https://cdn1.ozone.ru/s3/multimedia-f/wc250/6074115303.jpg',
      count: 0,
    },
    {
      id: 7,
      brand: 'IRBIS',
      category: 'Laptop',
      title: '13.3" Ноутбук IRBIS NB71, Intel Atom Z3735F (1.33 ГГц)',
      description: {
        'Процессор: ': 'Intel Atom Z3735F (1.33 ГГц)',
        'Оперативная память: ': '2 ГБ',
        'Общий объем eMMC, ГБ: ': '32',
        'Видеокарта: ': 'Intel HD Graphics',
        'Операционная система: ': 'Windows Home',
      },
      price: 520.45,
      img: 'https://cdn1.ozone.ru/s3/multimedia-0/wc250/6162374076.jpg',
      count: 0,
    },
    {
      id: 8,
      brand: 'Haier',
      category: 'Laptop',
      title: '15.6" Ноутбук Haier U1520EM, Intel Celeron N4020 (1.1 ГГц)',
      description: {
        'Процессор: ': 'Intel Celeron N4020 (1.1 ГГц)',
        'Оперативная память: ': '4 ГБ',
        'Общий объем eMMC, ГБ: ': '64',
        'Видеокарта: ': 'Intel HD Graphics 600',
        'Операционная система: ': 'Windows Home',
      },
      price: 932.47,
      img: 'https://cdn1.ozone.ru/s3/multimedia-a/wc250/6141818158.jpg',
      count: 0,
    },
  ],
  cart: [],
  isOnCart: false,
};

export class Model {
  private _state;
  public events = new Signal<AppState>()

  constructor(state: AppState = initialState) {
    this._state = state;
  }

  public getState() {
    return this._state;
  }

  public setState(newState: AppState) {
    this._state = { ...this.getState(), ...newState };
    this.events.emit(this._state);
  }
}
