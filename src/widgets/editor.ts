import * as monaco from 'monaco-editor';
import {Message} from '@phosphor/messaging';
import {Widget} from '@phosphor/widgets';

export class EditorWidget extends Widget {
  private editor: monaco.editor.IStandaloneCodeEditor | undefined = undefined;

  static createNode(): HTMLElement {
    let node = document.createElement('div');
    return node;
  }

  constructor() {
    super({ node: EditorWidget.createNode() });
    this.setFlag(Widget.Flag.DisallowLayout);
    this.addClass('editor');
    this.title.label = "zfoobar.prog.abap";
    this.title.closable = true;
    this.title.caption = this.title.label;
  }

  get inputNode(): HTMLInputElement {
    return this.node.getElementsByTagName('input')[0] as HTMLInputElement;
  }

  protected onResize() {
    if (this.editor) {
      this.editor.layout();
    }
  }

  protected onActivateRequest(msg: Message): void {
    if (this.editor) {
      this.editor.focus();
    }
  }

  protected onAfterAttach() {
    if (this.editor === undefined) {
      this.editor = monaco.editor.create(this.node, {
        value: [
          'WRITE \'hello world\'.'
        ].join('\n'),
        language: 'abap'
      });
    }
  }
}