import {Editor} from 'tinymce';
import BaseElement from './BaseElement';
import InsertColumn from '../dialog/InsertColumn';

export default class Column extends BaseElement {
    private static readonly CMD_INSERT_COLUMN = 'columnInsert';
    private static readonly CMD_DELETE_COLUMN = 'columnDelete';

    private static readonly BTN_COLUMN = 'column';

    constructor(protected editor: Editor) {
        super(editor);

        this.insert = this.insert.bind(this);

        editor.addCommand(Column.CMD_INSERT_COLUMN, this.insert);
        editor.addCommand(Column.CMD_DELETE_COLUMN, this.delete);

        editor.addButton(Column.BTN_COLUMN, {
            type: 'menubutton',
            icon: 'pagebreak fa-rotate-90',
            tooltip: 'Column',
            menu: [
                {text: 'Insert after', onclick: this.cmd(Column.CMD_INSERT_COLUMN, 'after')},
                {text: 'Insert before', onclick: this.cmd(Column.CMD_INSERT_COLUMN, 'before')},
                {text: 'remove', onclick: this.cmd(Column.CMD_DELETE_COLUMN)},
            ]
        });
    }

    private insert(ui: boolean, value: object): boolean {
        const element = this.getElement();
        if (!element) {
            this.editor.windowManager.open(InsertColumn.render(this.onInsertSubmit), {});
            return true;
        }
        return false;
    }

    private delete(ui: boolean, value: object): boolean {
        const element = this.getElementColumn();
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