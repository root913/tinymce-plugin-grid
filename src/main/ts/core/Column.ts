import {Editor} from 'tinymce';
import BaseElement from './BaseElement';
import InsertColumn from '../dialog/InsertColumn';

export default class Column extends BaseElement {
    public static readonly CMD_INSERT_AFTER_COLUMN = 'columnInsertAfter';
    public static readonly CMD_INSERT_BEFORE_COLUMN = 'columnInsertBefore';
    public static readonly CMD_DELETE_COLUMN = 'columnDelete';
    public static readonly CMD_PROPERTIES_COLUMN = 'columnProperties';

    public static readonly BTN_COLUMN_INSERT_AFTER = 'column_insert_after';
    public static readonly BTN_COLUMN_INSERT_BEFORE = 'column_insert_before';
    public static readonly BTN_COLUMN_DELETE = 'column_delete';
    public static readonly BTN_COLUMN_PROPERTIES = 'column_properties';

    constructor(protected editor: Editor) {
        super(editor);

        this.insert = this.insert.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.delete = this.delete.bind(this);
        this.properties = this.properties.bind(this);
        this.onInsertSubmit = this.onInsertSubmit.bind(this);

        editor.addCommand(Column.CMD_INSERT_AFTER_COLUMN, this.insertAfter);
        editor.addCommand(Column.CMD_INSERT_BEFORE_COLUMN, this.insertBefore);
        editor.addCommand(Column.CMD_DELETE_COLUMN, this.delete);
        editor.addCommand(Column.CMD_PROPERTIES_COLUMN, this.properties);

        editor.addButton(Column.BTN_COLUMN_PROPERTIES, {
            icon: 'tablecellprops',
            cmd: Column.CMD_PROPERTIES_COLUMN,
            context: 'properties',
            tooltip: 'Column properties',
        });

        editor.addButton(Column.BTN_COLUMN_INSERT_AFTER, {
            icon: 'tableinsertcolafter',
            cmd: Column.CMD_INSERT_AFTER_COLUMN,
            context: 'insert',
            tooltip: 'Insert column after',
        });

        editor.addButton(Column.BTN_COLUMN_INSERT_BEFORE, {
            icon: 'tableinsertcolbefore',
            cmd: Column.CMD_INSERT_BEFORE_COLUMN,
            context: 'insert',
            tooltip: 'Insert column before',
        });

        editor.addButton(Column.BTN_COLUMN_DELETE, {
            icon: 'tabledeletecol',
            cmd: Column.CMD_DELETE_COLUMN,
            context: 'delete',
            tooltip: 'Delete column',
        });
    }

    private insertAfter(ui: boolean, value: any): boolean {
        return this.insert(ui, 'after');
    }

    private insertBefore(ui: boolean, value: any): boolean {
        return this.insert(ui, 'before');
    }

    private insert(ui: boolean, value: any): boolean {
        const row: HTMLElement = <HTMLElement> this.getElementRow();
        if (row) {
            this.editor.windowManager.open(InsertColumn.render((data) => {
                this.onInsertSubmit(data, value);
            }, {}), {});
            return true;
        }
        return false;
    }

    private delete(ui: boolean, value: object): boolean {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            const row = column.parentNode;
            if (row.querySelectorAll('.grid-col').length === 1) {
                return false;
            } else {
                this.editor.dom.remove(column);
            }
            return true;
        }
        return false;
    }

    private onInsertSubmit({data}, value) {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            if (value === 'after') {
                column.parentNode.insertBefore(this.template(data), column.nextSibling);
            } else {
                column.parentNode.insertBefore(this.template(data), column);
            }
        } else {
            const row: HTMLElement = <HTMLElement> this.getElementRow();
            row.appendChild(this.template(data));
        }
    }

    private properties(ui: boolean, value: any): boolean {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            const selected = InsertColumn.getSelected(column.classList.value);
            this.editor.windowManager.open(InsertColumn.render((event) => {
                // Remove old
                const removeClass = [];
                column.classList.forEach((className) => {
                    if (className.indexOf('col-') !== -1) {
                        removeClass.push(className);
                    }
                });
                removeClass.forEach((className) => {
                    column.classList.remove(className);
                });
                // Save new
                for (const key in event.data) {
                    if (event.data.hasOwnProperty(key)) {
                        const element = event.data[key];
                        const breakpoint = InsertColumn.breakpoints.find((br) => br.value === key);
                        if (!element) {
                            continue;
                        }
                        column.classList.add(`col-${breakpoint.preffix}-${element}`);
                    }
                }
            }, {
                class: column.classList.value,
                selected
            }), {});
            return true;
        }
        return false;
    }

    private template(breakpoints) {
        const sm = breakpoints.small.length > 0 ? `col-sm-${breakpoints.small}` : '';
        const md = breakpoints.medium.length > 0 ? `col-md-${breakpoints.medium}` : '';
        const lg = breakpoints.large.length > 0 ? `col-lg-${breakpoints.large}` : '';
        const className = `${sm} ${md} ${lg}`;
        const node = `<div class="grid-col ${className.trim()}">&nbsp;</div>`;

        const div = document.createElement('div');
        div.innerHTML = node.trim();
        return div.firstChild;
    }
}