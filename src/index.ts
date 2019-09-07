import 'es6-promise/auto';  // polyfill Promise on IE
import {CommandRegistry} from '@phosphor/commands';
import {Message} from '@phosphor/messaging';
import {BoxPanel, CommandPalette, ContextMenu, DockPanel, Menu, MenuBar, Widget} from '@phosphor/widgets';
import '../style/index.css';

const commands = new CommandRegistry();

function createMenu(): Menu {
  let root = new Menu({ commands });
  root.addItem({ command: 'example:copy' });
  root.addItem({ command: 'example:close' });
  return root;
}

class CustomWidget extends Widget {

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    let content = document.createElement('div');
    let input = document.createElement('input');
    input.placeholder = 'Placeholder...';
    content.appendChild(input);
    node.appendChild(content);
    return node;
  }

  constructor() {
    super({ node: CustomWidget.createNode() });
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass('content');
    this.title.label = "Label";
    this.title.closable = true;
    this.title.caption = `long description`;
  }

  get inputNode(): HTMLInputElement {
    return this.node.getElementsByTagName('input')[0] as HTMLInputElement;
  }

  protected onActivateRequest(msg: Message): void {
    if (this.isAttached) {
      this.inputNode.focus();
    }
  }
}


function main(): void {

  commands.addCommand('example:copy', {
    label: 'Copy File',
    mnemonic: 0,
    iconClass: 'fa fa-copy',
    execute: () => {
      console.log('Copy');
    }
  });

  let menu1 = createMenu();
  menu1.title.label = 'File';
  menu1.title.mnemonic = 0;

  let bar = new MenuBar();
  bar.addMenu(menu1);
  bar.id = 'menuBar';


  let contextMenu = new ContextMenu({ commands });
  document.addEventListener('contextmenu', (event: MouseEvent) => {
    if (contextMenu.open(event)) {
      event.preventDefault();
    }
  });
  contextMenu.addItem({ command: 'example:copy', selector: '.content' });

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    commands.processKeydownEvent(event);
  });

  let r1 = new CustomWidget();
  let dock = new DockPanel();
  dock.addWidget(r1);
  dock.id = 'dock';
  BoxPanel.setStretch(dock, 1);

  let palette = new CommandPalette({ commands });
  palette.id = 'palette';

  let main = new BoxPanel({ direction: 'left-to-right', spacing: 0 });
  main.id = 'main';
  main.addWidget(palette);
  main.addWidget(dock);

  window.onresize = () => { main.update(); };

  Widget.attach(bar, document.body);
  Widget.attach(main, document.body);
}


window.onload = main;
