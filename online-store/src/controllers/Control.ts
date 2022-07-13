class Control<NodeType extends HTMLElement> {
  public node: NodeType;

  constructor(parentElement: HTMLElement, tagName = 'div', classList = '', content = '') {
    const element = document.createElement(tagName);
    element.className = classList;
    element.textContent = content;

    if (parentElement) {
      parentElement.append(element);
    }

    this.node = element as NodeType;
  }
}

export { Control };
