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
    const products = this.model.getState().products;
    const sortedItems = this.sortItems(config, products);
    this.model.setState({
      visible: sortedItems,
      filters: {
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

  private hasAnyFilters(): boolean {
    const filters = this.model.getState().filters;
    const filterTypes = Object.values(filters);
    return !!filterTypes.filter((filterTypes) => filterTypes.length).length;
  }

  private searchItems(): Product[] {
    let products = [...this.model.getState().products];
    const hasAnyFilters = this.hasAnyFilters();
    const searchValue = this.model.getState().searchValue;

    if (hasAnyFilters) {
      products = this.filterItems();
    }

    if (!!searchValue) {
      products = products.filter((item) => item.title.toLowerCase().includes(searchValue));
    }

    return products;
  }

  public setSearchValue(inputValue: string) {
    this.model.setState({
      ...this.model.getState(),
      searchValue: inputValue,
    });

    const foundItems = this.searchItems();
    const fountAfterSort = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({
      ...this.model.getState(),
      visible: fountAfterSort,
    });
  }

  public sortItems = (config: string, products: Product[]): Product[] => {
    const [key, direction] = config.split('_');
    let sortableItems: Product[];

    sortableItems = [...products];

    if (key === 'title') {
      sortableItems.sort((a, b) => {
        if (a['title'].toLowerCase() < b['title'].toLowerCase()) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a['title'].toLowerCase() > b['title'].toLowerCase()) {
          return direction === 'asc' ? 1 : -1;
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
      ...this.model.getState(),
      visible: sortableItems,
      sortSettings: config,
    });
  };

  public filterItems(): Product[] {
    const filters = this.model.getState().filters;
    const [category, brand] = Object.keys(filters);
    const products = [...this.model.getState().products];

    return products.filter((product) => {
      if (filters[category].length && filters[brand].length) {
        return (
          (filters[category] as Category[]).find((filter) => Object.values(product).includes(filter)) &&
          (filters[brand] as Brand[]).find((filter) => Object.values(product).includes(filter))
        );
      } else if (filters[category].length) {
        return (filters[category] as Category[]).find((filter) => Object.values(product).includes(filter));
      } else if (filters[brand].length) {
        return (filters[brand] as Brand[]).find((filter) => Object.values(product).includes(filter));
      }
    });
  }

  public changeFilters(event: MouseEvent, filter: string) {
    const checked = (event.target as HTMLInputElement).checked;
    const idFilter = (event.target as HTMLElement).id;
    const filters = this.model.getState().filters;
    let newFiltersCategory: Category[] = filters.category;
    let newFiltersBrand: Brand[] = filters.brand;

    if (checked) {
      if (filter === 'category') {
        newFiltersCategory = [...filters.category, idFilter as Category];
      } else if (filter === 'brand') {
        newFiltersBrand = [...filters.brand, idFilter as Brand];
      }
    } else {
      if (filter === 'category') {
        newFiltersCategory = filters.category.filter((cat) => cat !== idFilter);
      } else if (filter === 'brand') {
        newFiltersBrand = filters.brand.filter((cat) => cat !== idFilter);
      }
    }

    this.model.setState({
      ...this.model.getState(),
      filters: {
        category: newFiltersCategory,
        brand: newFiltersBrand,
      },
    });

    const foundItems = this.searchItems();
    const sortedItems = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({
      ...this.model.getState(),
      visible: sortedItems,
    });
  }

  public changeRanges(idRange: string, values: number[]) {
    const newRanges = { ...this.model.getState().ranges };

    for (const key in newRanges) {
      if (idRange === key) {
        newRanges[idRange] = values;
      }
    }

    this.model.setState({
      ...this.model.getState(),
      ranges: newRanges,
    });

    console.log(this.model.getState().visible);

    const foundItems = this.searchItems().filter(
      (product) => product[idRange] >= values[0] && product[idRange] <= values[1]
    );
    const sortedItems = this.sortItems(this.model.getState().sortSettings, foundItems);

    this.model.setState({
      ...this.model.getState(),
      visible: sortedItems,
    });

    console.log(this.model.getState().visible);
  }

  public addToCart(card: Product) {
    const state = this.model.getState();
    if (state.cart.length < 20) {
      this.model.setState({ ...state, cart: [...state.cart, card] });
    } else {
      alert('Извините, все слоты заполнены');
    }
  }

  public removeFromCart(id: number) {
    const state = this.model.getState();
    const newCart = state.cart.filter((item) => item.id !== id);
    this.model.setState({ ...state, cart: newCart });
  }

  public toggleIsOnCart() {
    const state = this.model.getState();
    const newValue = !state.isOnCart;
    this.model.setState({ ...state, isOnCart: newValue });
  }
}
