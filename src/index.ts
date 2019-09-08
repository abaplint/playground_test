import 'es6-promise/auto';  // polyfill Promise on IE
import {CommandRegistry} from '@phosphor/commands';
import {BoxPanel, ContextMenu, DockPanel, Menu, MenuBar, Widget} from '@phosphor/widgets';
import '../style/index.css';
import {EditorWidget, TreeWidget, ProblemsWidget} from './widgets/';

const commands = new CommandRegistry();

function createMenu(): Menu {
  let root = new Menu({ commands });
  root.addItem({ command: 'example:copy' });
  root.addItem({ command: 'example:close' });
  return root;
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

  let menu = new MenuBar();
  menu.addMenu(menu1);
  menu.id = 'menuBar';


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

  let r1 = new EditorWidget();
  let r2 = new EditorWidget();
  let dock = new DockPanel();
  dock.addWidget(r1);
  dock.addWidget(r2);
  dock.id = 'dock';
  BoxPanel.setStretch(dock, 1);

  let tree = new TreeWidget();
  tree.id = "tree";

  let problems = new ProblemsWidget();
  problems.id = "problems";

  let left = new BoxPanel({ direction: "top-to-bottom", spacing: 0 });
  left.id = 'left';
  left.addWidget(dock);
  left.addWidget(problems);

  let main = new BoxPanel({ direction: 'left-to-right', spacing: 0 });
  main.id = 'main';
  main.addWidget(tree);
  main.addWidget(left);


  window.onresize = () => { main.update(); };

  Widget.attach(menu, document.body);
  Widget.attach(main, document.body);
}


window.onload = main;
