import { Brand, Category } from './../models/model.types';
import { Model } from '../models/model';
import { Product } from '../models/model.types';

export class Controller {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  public clearStorage(): void {
    this.model.clearStorage();
  }

  public resetFilters(): void {
    const config = this.model.getState().sortSettings;
    const foundItems = this.searchItems();
    const sortedItems = this.sortItems(config, foundItems);
    this.model.setState({
      visible: sortedItems,
      filters: {
        isPopular: [],
        isNew: [],
        category: [],
        brand: [],
      },
      ranges: {
        count: [0, 20],
        year: [2015, 2022],
      },
    });
  }

  public isInCart(card: Product): boolean {
    return !!this.model.getState().cart.find((cartItem) => cartItem.id === card.id);
  }

  private isChangedRanges(): boolean {
    const ranges = this.model.getState().ranges;
    const isChangedRangeCount = ranges.count[0] !== 0 || ranges.count[1] !== 20;
    const isChangedRangeYear = ranges.year[0] !== 2015 || ranges.year[1] !== 2022;
    return isChangedRangeCount || isChangedRangeYear;
  }

  private hasAnyFilters(): boolean {
    const filters = this.model.getState().filters;
    return !!Object.values(filters).filter((filterTypes) => filterTypes.length).length;
  }

  private searchItems(): Product[] {
    let products = [...this.model.getState().products];
    const hasAnyFilters = this.hasAnyFilters();
    const isChangedRanges = this.isChangedRanges();
    const searchValue = this.model.getState().searchValue;

    if (hasAnyFilters || isChangedRanges) {
      products = this.filterItems();
    }
    if (searchValue) {
      products = products.filter((item) => item.title.toLowerCase().includes(searchValue));
    }

    return products;
  }

  public setSearchValue(inputValue: string) {
    this.model.setState({
      searchValue: inputValue,
    });

    const foundItems = this.searchItems();
    const fountAfterSort = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({
      visible: fountAfterSort,
    });
  }

  public clearSearchValue() {
    this.setSearchValue('');
  }

  public sortItems = (config: string, products: Product[]): Product[] => {
    const [key, direction] = config.split('_');
    const sortableItems = [...products];

    if (key === 'title') {
      sortableItems.sort((a, b) => {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          return direction === 'asc' ? 1 : -1;
        }
        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          return direction === 'asc' ? -1 : 1;
        }
        return 0;
      });
    } else if (key === 'price') {
      sortableItems.sort((a, b) => (direction === 'asc' ? a.price - b.price : b.price - a.price));
    }

    return sortableItems;
  };

  public sortBy = (config: string) => {
    let sortableItems: Product[];
    if (!this.model.getState().visible.length) {
      sortableItems = this.sortItems(config, this.model.getState().products);
    } else {
      sortableItems = this.sortItems(config, this.model.getState().visible);
    }

    this.model.setState({
      visible: sortableItems,
      sortSettings: config,
    });
  };

  public filterItems(): Product[] {
    const filters = this.model.getState().filters;
    const ranges = this.model.getState().ranges;
    const [isPopular, isNew, category, brand] = Object.keys(filters);
    let filteredItems = [...this.model.getState().products];

    if (filters[category].length) {
      filteredItems = filteredItems.filter((product) => {
        return (filters[category] as Category[]).find((filter) => Object.values(product).includes(filter));
      });
    }
    if (filters[brand].length) {
      filteredItems = filteredItems.filter((product) => {
        return (filters[brand] as Brand[]).find((filter) => Object.values(product).includes(filter));
      });
    }
    if (filters[isPopular].length) {
      filteredItems = filteredItems.filter((product) => product.isPopular);
    }
    if (filters[isNew].length) {
      filteredItems = filteredItems.filter((product) => product.isNew);
    }

    filteredItems = filteredItems.filter(
      (product) => product.count >= ranges.count[0] && product.count <= ranges.count[1],
    );
    filteredItems = filteredItems.filter((product) => product.year >= ranges.year[0] && product.year <= ranges.year[1]);

    return filteredItems;
  }

  public changeFilters(event: MouseEvent, filter: string) {
    const checked = (event.target as HTMLInputElement).checked;
    const idFilter = (event.target as HTMLElement).id;
    const filters = this.model.getState().filters;
    let newFiltersIsPopular: string[] = filters.isPopular;
    let newFiltersIsNew: string[] = filters.isNew;
    let newFiltersCategory: Category[] = filters.category;
    let newFiltersBrand: Brand[] = filters.brand;

    if (checked) {
      if (filter === 'isPopular') {
        newFiltersIsPopular = ['true'];
      } else if (filter === 'isNew') {
        newFiltersIsNew = ['true'];
      } else if (filter === 'category') {
        newFiltersCategory = [...filters.category, idFilter as Category];
      } else if (filter === 'brand') {
        newFiltersBrand = [...filters.brand, idFilter as Brand];
      }
    } else {
      if (filter === 'isPopular') {
        newFiltersIsPopular = [];
      } else if (filter === 'isNew') {
        newFiltersIsNew = [];
      } else if (filter === 'category') {
        newFiltersCategory = filters.category.filter((cat) => cat !== idFilter);
      } else if (filter === 'brand') {
        newFiltersBrand = filters.brand.filter((cat) => cat !== idFilter);
      }
    }

    this.model.setState({
      filters: {
        isPopular: newFiltersIsPopular,
        isNew: newFiltersIsNew,
        category: newFiltersCategory,
        brand: newFiltersBrand,
      },
    });

    const foundItems = this.searchItems();
    const sortedItems = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({ visible: sortedItems });
  }

  public changeRanges(idRange: string, values: number[]) {
    const newRanges = { ...this.model.getState().ranges };

    for (const key in newRanges) {
      if (idRange === key) {
        newRanges[idRange] = values;
      }
    }

    this.model.setState({ ranges: newRanges });

    const foundItems = this.searchItems();
    const sortedItems = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({ visible: sortedItems });
  }

  public addToCart(card: Product) {
    const state = this.model.getState();
    if (state.cart.length < 20) {
      this.model.setState({ cart: [...state.cart, card] });
    } else {
      alert('Извините, все слоты заполнены');
    }
  }

  public removeFromCart(id: number) {
    const state = this.model.getState();
    const newCart = state.cart.filter((item) => item.id !== id);
    this.model.setState({ cart: newCart });
  }

  public toggleIsOnCart() {
    const state = this.model.getState();
    const newValue = !state.isOnCart;
    this.model.setState({ isOnCart: newValue });
  }
}
