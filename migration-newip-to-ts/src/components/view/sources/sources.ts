import './sources.css';
import { DataSources } from './sources.types';

class Sources {
  private currentPage: number = 1;
  readonly itemsOnPage: number = 6;
  private countPages: number = 0;

  draw(data: DataSources[]): void {
    this.countPages = Math.ceil(data.length / this.itemsOnPage);
    this.drawSources(data, this.currentPage);
    this.setPagination(data);
    this.updatePagination(this.currentPage);
  }

  private drawSources(sources: DataSources[], pageNumber: number): void {
    let startIndex: number = this.itemsOnPage * (pageNumber - 1);
    let endIndex: number = this.itemsOnPage * pageNumber;

    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    const visibleSources = sources
      .slice(startIndex, endIndex)
      .map((item: DataSources) => this.createSourceItem(item, sourceItemTemp));

    const sourcesContainer = document.querySelector('.sources') as HTMLElement;
    sourcesContainer.innerHTML = '';
    sourcesContainer.append(...visibleSources);
  }

  private createSourceItem(item: DataSources, template: HTMLTemplateElement): HTMLElement {
    const sourceClone = template.content.cloneNode(true) as HTMLElement;

    (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
    (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

    return sourceClone;
  }

  private setPagination(sources: DataSources[]): void {
    (document.querySelector('.prev-page') as HTMLElement).addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.drawSources(sources, this.currentPage);
        this.updatePagination(this.currentPage);
      }
    });

    (document.querySelector('.next-page') as HTMLElement).addEventListener('click', () => {
      if (this.currentPage < this.countPages) {
        this.currentPage++;
        this.drawSources(sources, this.currentPage);
        this.updatePagination(this.currentPage);
      }
    });
  }

  private updatePagination(pageNumber: number): void {
    (document.querySelector('.current-page') as HTMLElement).textContent = `${pageNumber} / ${this.countPages}`;
  }
}

export default Sources;
