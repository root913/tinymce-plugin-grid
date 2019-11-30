import {Editor} from 'tinymce';
import BaseElement from './BaseElement';
import Column from './Column';

export default class Row extends BaseElement {
    public static readonly CMD_INSERT_AFTER_ROW = 'rowInsertAfter';
    public static readonly CMD_INSERT_BEFORE_ROW = 'rowInsertBefore';
    public static readonly CMD_DELETE_ROW = 'rowDelete';

    public static readonly BTN_ROW_INSERT_AFTER = 'row_insert_after';
    public static readonly BTN_ROW_INSERT_BEFORE = 'row_insert_before';
    public static readonly BTN_ROW_DELETE = 'row_delete';

    constructor(protected editor: Editor) {
        super(editor);

        this.insert = this.insert.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.delete = this.delete.bind(this);

        editor.addCommand(Row.CMD_INSERT_AFTER_ROW, this.insertAfter);
        editor.addCommand(Row.CMD_INSERT_BEFORE_ROW, this.insertBefore);
        editor.addCommand(Row.CMD_DELETE_ROW, this.delete);

        editor.addButton(Row.BTN_ROW_INSERT_AFTER, {
            icon: 'tableinsertrowafter',
            cmd: Row.CMD_INSERT_AFTER_ROW,
            context: 'insert',
            tooltip: 'Insert row after',
        });

        editor.addButton(Row.BTN_ROW_INSERT_BEFORE, {
            icon: 'tableinsertrowbefore',
            cmd: Row.CMD_INSERT_BEFORE_ROW,
            context: 'insert',
            tooltip: 'Insert row before',
        });

        editor.addButton(Row.BTN_ROW_DELETE, {
            icon: 'tabledeleterow',
            cmd: Row.CMD_DELETE_ROW,
            context: 'delete',
            tooltip: 'Delete row',
        });
    }

    private insertAfter(ui: boolean, value: any): boolean {
        return this.insert(ui, 'after');
    }

    private insertBefore(ui: boolean, value: any): boolean {
        return this.insert(ui, 'before');
    }

    private insert(ui: boolean, value: any): boolean {
        const element: HTMLElement = <HTMLElement> this.getElementRow();
        if (element) {
            const newRow = this.template();
            if (value === 'after') {
                element.parentNode.insertBefore(newRow, element.nextSibling);
            } else {
                element.parentNode.insertBefore(newRow, element);
            }
            return true;
        }
        return false;
    }

    private delete(ui: boolean, value: object): boolean {
        const element: HTMLElement = <HTMLElement> this.getElementRow();
        if (element) {
            this.editor.dom.remove(element);
            return true;
        }
        return false;
    }

    private template() {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="grid-row row">
            <div class="grid-col col-lg-12">&nbsp;</div>
        </div>`.trim();
        return div.firstChild;
    }
}