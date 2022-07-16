import { Signal } from '../controllers/Signal';
import { AppState, Filters, Product } from './model.types';

const initialState: AppState = {
  products: [],
  visible: [],
  cart: [],
  isOnCart: false,
  sortSettings: '',
  searchValue: '',
  defaultFilters: {
    category: ['Laptop', 'Monoblock', 'Smartphone', 'Tablet', 'TV'],
    brand: [
      'Asus',
      'Lenovo',
      'IRBIS',
      'Haier',
      'Acer',
      'Echips',
      'Poco',
      'realme',
      'ZTE',
      'Xiaomi',
      'Vivo',
      'Samsung',
      'Horizont',
      'KIVI',
      'HP',
      'MSI',
      'Dell',
      'Huawei',
      'Realme',
      'KIWI',
    ],
  },
  filters: {
    category: [],
    brand: [],
  },
};

export class Model {
  private _state;
  public events = new Signal<AppState>();

  constructor(state: AppState = initialState) {
    this._state = state;
    this.loadData();
  }

  private saveStorage() {
    const { filters, sortSettings, cart, visible } = this._state;
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('sortSettings', JSON.stringify(sortSettings));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('visible', JSON.stringify(visible));
  }

  private getStorage() {
    const filters: Filters = JSON.parse(localStorage.getItem('filters') || '{"category": [], "brand": []}');
    const sortSettings: string = JSON.parse(localStorage.getItem('sortSettings') || '""');
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const visible: Product[] = JSON.parse(localStorage.getItem('visible') || '[]');

    return { filters, sortSettings, cart, visible };
  }

  public clearStorage() {
    localStorage.clear()
  }

  private async loadData() {
    const { filters, sortSettings, cart, visible } = this.getStorage();

    await fetch('../DB/db.json')
      .then((res) => res.json())
      .then((productsData: Product[]) =>
        this.setState({ ...this.getState(), products: productsData, filters, sortSettings, cart, visible })
      )
      .catch((error) => alert(`Ошибка ${error}`));
  }

  public getState() {
    return this._state;
  }

  public setState(newState: Partial<AppState>) {
    this._state = { ...this.getState(), ...newState };
    this.saveStorage();
    console.log('STATE: ', this._state);
    this.events.emit(this._state);
  }
}
