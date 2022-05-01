import { Editor, I18n, Ui } from 'tinymce';
import InsertColumn from '../dialog/InsertColumn';
import IPreset from '../presets/IPreset';
import BaseElement from './BaseElement';
import Settings from './Settings';

export default class Column extends BaseElement {
    public static readonly CMD_INSERT_AFTER_COLUMN = 'columnInsertAfter';
    public static readonly CMD_INSERT_BEFORE_COLUMN = 'columnInsertBefore';
    public static readonly CMD_DELETE_COLUMN = 'columnDelete';
    public static readonly CMD_PROPERTIES_COLUMN = 'columnProperties';

    public static readonly BTN_COLUMN_INSERT_AFTER = 'column_insert_after';
    public static readonly BTN_COLUMN_INSERT_BEFORE = 'column_insert_before';
    public static readonly BTN_COLUMN_DELETE = 'column_delete';
    public static readonly BTN_COLUMN_PROPERTIES = 'column_properties';

    private insertColumnDialog: InsertColumn;

    constructor(protected settings: Settings, protected preset: IPreset, protected editor: Editor, protected i18n: I18n) {
        super(settings, editor, i18n);

        this.insertColumnDialog = new InsertColumn(this.preset);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.delete = this.delete.bind(this);
        this.properties = this.properties.bind(this);
        this.onInsertSubmit = this.onInsertSubmit.bind(this);

        // Buttons
        editor.ui.registry.addButton(Column.BTN_COLUMN_PROPERTIES, {
            icon: 'table-cell-properties',
            tooltip: i18n.translate('grid.column.properties'),
            onAction: this.properties
        });
        editor.ui.registry.addButton(Column.BTN_COLUMN_INSERT_AFTER, {
            icon: 'table-insert-column-after',
            tooltip: i18n.translate('grid.column.insert_after'),
            onAction: this.insertAfter
        });
        editor.ui.registry.addButton(Column.BTN_COLUMN_INSERT_BEFORE, {
            icon: 'table-insert-column-before',
            tooltip: i18n.translate('grid.column.insert_before'),
            onAction: this.insertBefore
        });
        editor.ui.registry.addButton(Column.BTN_COLUMN_DELETE, {
            icon: 'table-delete-column',
            tooltip: i18n.translate('grid.column.remove'),
            onAction: this.delete
        });
    }

    /**
     * Inserts Column element after selection
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private insertAfter(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        this.insert(api, 'after');
    }

    /**
     * Inserts Column element after selection
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private insertBefore(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        this.insert(api, 'before');
    }

    /**
     * Opens "insert Column" dialog
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     * @param   {Ui.Toolbar.string}  value
     *
     * @return  {void}
     */
    private insert(api: Ui.Toolbar.ToolbarButtonInstanceApi, value: 'after' | 'before'): boolean {
        const row: HTMLElement = <HTMLElement> this.getElementRow();
        if (row) {
            this.editor.windowManager.open(this.insertColumnDialog.render((data) => this.onInsertSubmit(data, value)));
            return true;
        }
        return false;
    }

    /**
     * Deletes selected Column element
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private delete(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            const row = column.parentNode;
            this.editor.dom.remove(column);
            if (row.querySelectorAll('.grid-col').length === 0) {
                this.editor.dom.remove(row);
            }
        }
    }

    /**
     * Deletes selected Column element
     *
     * @param   {any}  data
     * @param   {string}  value
     *
     * @return  {void}
     */
    private onInsertSubmit(data: any, value: 'after' | 'before'): void {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (column) {
            if (value === 'after') {
                column.parentNode.insertBefore(this.preset.renderColumn(data), column.nextSibling);
            } else {
                column.parentNode.insertBefore(this.preset.renderColumn(data), column);
            }
        } else {
            const row: HTMLElement = <HTMLElement> this.getElementRow();
            row.appendChild(this.preset.renderColumn(data));
        }
    }

    /**
     * Opens dialog with properties of selected column element
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private properties(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        const column: HTMLElement = <HTMLElement> this.getElementColumn();
        if (!column) {
            return;
        }

        const selected = this.insertColumnDialog.getSelected(column.classList.value);
        this.editor.windowManager.open(this.insertColumnDialog.render((data) => {
            // Remove old
            const removeClass = [];
            column.classList.forEach((className) => {
                if (this.preset.isColumn(className)) {
                    removeClass.push(className);
                }
            });
            removeClass.forEach((className) => {
                column.classList.remove(className);
            });
            // Save new
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    const breakpoint = this.preset.breakpoints.find((br) => br.value === key);
                    if (!element) {
                        continue;
                    }
                    column.classList.add(this.preset.columnClass(breakpoint.preffix, element));
                }
            }
        }, {
            class: column.classList.value,
            selected
        }), {});
    }
}