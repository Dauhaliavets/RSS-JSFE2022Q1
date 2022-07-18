import { Signal } from '../controllers/Signal';
import { AppState, Filters, Product, Ranges, RangeValues } from './model.types';

const initialState: AppState = {
  products: [],
  visible: [],
  cart: [],
  isOnCart: false,
  sortSettings: '',
  searchValue: '',
  defaultFilters: {
    isPopular: ['Populary'],
    isNew: ['New'],
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
    isPopular: [],
    isNew: [],
    category: [],
    brand: [],
  },
  ranges: {
    count: [RangeValues.MIN_COUNT, RangeValues.MAX_COUNT],
    year: [RangeValues.MIN_YEAR, RangeValues.MAX_YEAR],
  },
};

export class Model {
  private _state;
  public events = new Signal<AppState>();

  constructor(state: AppState = initialState) {
    this._state = state;
    this.loadData();
    this.downloadStorage();
  }

  public getState(): AppState {
    return this._state;
  }

  public setState(newState: Partial<AppState>): void {
    this._state = { ...this.getState(), ...newState };
    this.saveStorage();
    this.events.emit(this.getState());
  }

  private async loadData() {
    await fetch('../DB/db.json')
      .then((res) => res.json())
      .then((productsData: Product[]) => this.setState({ products: productsData }))
      .catch((error) => alert(`Ошибка ${error}`));
  }

  private saveStorage(): void {
    const { filters, ranges, sortSettings, cart, visible } = this.getState();
    localStorage.setItem('filters', JSON.stringify(filters));
    localStorage.setItem('ranges', JSON.stringify(ranges));
    localStorage.setItem('sortSettings', JSON.stringify(sortSettings));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('visible', JSON.stringify(visible));
  }

  private downloadStorage(): void {
    const filters: Filters = JSON.parse(
      localStorage.getItem('filters') || '{"category": [], "brand": [], "isPopular": [], "isNew": []}',
    );
    const ranges: Ranges = JSON.parse(
      localStorage.getItem('ranges') ||
        `{"count": [${RangeValues.MIN_COUNT},${RangeValues.MAX_COUNT}], "year": [${RangeValues.MIN_YEAR},${RangeValues.MAX_YEAR}]}`,
    );
    const sortSettings: string = JSON.parse(localStorage.getItem('sortSettings') || '""');
    const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const visible: Product[] = JSON.parse(localStorage.getItem('visible') || '[]');

    this.setState({ filters, ranges, sortSettings, cart, visible });
  }

  public clearStorage(): void {
    localStorage.clear();
  }
}
