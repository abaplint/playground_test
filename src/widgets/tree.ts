import {Message} from '@phosphor/messaging';
import {Widget} from '@phosphor/widgets';

export class TreeWidget extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let content = document.createElement('div');
    let input = document.createElement('tt');
    input.innerText = 'tree';
    content.appendChild(input);
    node.appendChild(content);
    return node;
  }

  constructor() {
    super({ node: TreeWidget.createNode() });
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass('content');
    /*
    this.title.label = "zfoobar.prog.abap";
    this.title.closable = true;
    this.title.caption = this.title.label;
    */
  }

//  get inputNode(): HTMLInputElement {
//    return this.node.getElementsByTagName('input')[0] as HTMLInputElement;
//  }

  protected onActivateRequest(msg: Message): void {
    /*
    if (this.isAttached) {
      this.inputNode.focus();
    }
    */
  }
}