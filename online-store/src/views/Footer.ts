import { Control } from '../controllers/Control';

export class Footer extends Control<HTMLElement> {
  container: Control<HTMLElement>;
  copyright: Control<HTMLElement>;
  githubLink: Control<HTMLAnchorElement>;
  rsLink: Control<HTMLAnchorElement>;
  rsLinkIcon: Control<HTMLImageElement>;

  constructor(parentElement: HTMLElement) {
    super(parentElement, 'footer', 'footer');
    this.container = new Control(this.node, 'div', 'footer__container container');
    this.copyright = new Control(this.container.node, 'div', 'footer__copyright');
    this.copyright.node.textContent = 'Copyright © 2022 Online Store';
    this.githubLink = new Control(this.container.node, 'a', 'footer__github-link', 'Github: Dauhaliavets');
    this.githubLink.node.href = 'https://github.com/Dauhaliavets';
    this.githubLink.node.target = '_blank';
    this.rsLink = new Control(this.container.node, 'a', 'footer__rs-link');
    this.rsLink.node.href = 'https://rs.school/js/';
    this.rsLink.node.target = '_blank';
    this.rsLinkIcon = new Control(this.rsLink.node, 'img', 'footer__rs-link-image');
    this.rsLinkIcon.node.src = '../assets/rs_school_js.svg';
  }
}
