import './sources.css';
import { DataSources } from './sources.types';

class Sources {
  private currentPage = 1;
  private itemsOnPage = 8;
  private countPages = 0;
  private data: Readonly<DataSources>[] = [];

  public draw(data: Readonly<DataSources>[]): void {
    this.data = data;
    this.countPages = Math.ceil(this.data.length / this.itemsOnPage);
    this.drawSources(this.currentPage);
    this.initPagination();
    this.updatePagination(this.currentPage);
  }

  private drawSources(pageNumber: number): void {
    const startIndex: number = this.itemsOnPage * (pageNumber - 1);
    const endIndex: number = this.itemsOnPage * pageNumber;

    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    const visibleSources = this.data
      .slice(startIndex, endIndex)
      .map((item: Readonly<DataSources>) => this.createSourceItem(item, sourceItemTemp));

    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    sourcesContainer.innerHTML = '';
    sourcesContainer.append(...visibleSources);
  }

  private createSourceItem(item: Readonly<DataSources>, template: HTMLTemplateElement): HTMLElement {
    const sourceClone = template.content.cloneNode(true) as HTMLElement;

    (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
    (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

    return sourceClone;
  }

  private initPagination(): void {
    (document.querySelector('.btn__prev-page') as HTMLElement).addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.drawSources(this.currentPage);
        this.updatePagination(this.currentPage);
      }
    });

    (document.querySelector('.btn__next-page') as HTMLElement).addEventListener('click', () => {
      if (this.currentPage < this.countPages) {
        this.currentPage++;
        this.drawSources(this.currentPage);
        this.updatePagination(this.currentPage);
      }
    });
  }

  private updatePagination(pageNumber: number): void {
    (document.querySelector('.current-page') as HTMLElement).textContent = `${pageNumber} / ${this.countPages}`;
  }
}

export default Sources;
