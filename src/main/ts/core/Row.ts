import {Editor} from 'tinymce';
import BaseElement from './BaseElement';

export default class Row extends BaseElement {
    private static readonly CMD_INSERT_ROW = 'rowInsert';
    private static readonly CMD_DELETE_ROW = 'rowDelete';

    private static readonly BTN_ROW = 'row';

    constructor(protected editor: Editor) {
        super(editor);

        this.insert = this.insert.bind(this);

        editor.addCommand(Row.CMD_INSERT_ROW, this.insert);
        editor.addCommand(Row.CMD_DELETE_ROW, this.delete);

        editor.addButton(Row.BTN_ROW, {
            type: 'menubutton',
            icon: 'pagebreak fa-rotate-90',
            tooltip: 'Row',
            menu: [
                {text: 'Insert after', onclick: this.cmd(Row.CMD_INSERT_ROW, 'after')},
                {text: 'Insert before', onclick: this.cmd(Row.CMD_INSERT_ROW, 'before')},
                {text: 'remove', onclick: this.cmd(Row.CMD_DELETE_ROW)},
            ]
        });
    }

    private insert(ui: boolean, value: object): boolean {
        const element = this.getElement();
        if (!element) {
            //this.editor.windowManager.open(InsertRow.render(this.onInsertSubmit), {});
            return true;
        }
        return false;
    }

    private delete(ui: boolean, value: object): boolean {
        const element = this.getElementRow();
        if (element) {
            this.editor.dom.remove(element);
            return true;
        }
        return false;
    }

    private onInsertSubmit({data}) {
        this.editor.execCommand('mceInsertContent', false, this.template(data));
    }

    private template(breakpoints) {
        const node = `
        <div class="grid container editoNonEditable">
            <div class="grid-row row editoNonEditable">
                <div class="grid-col col-lg-12 editoNonEditable">Lorem ipsum</div>
            </div>
        </div>`;
        return node;
    }
}