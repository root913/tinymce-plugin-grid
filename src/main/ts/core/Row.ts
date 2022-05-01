import { Editor, I18n, Ui } from 'tinymce';
import BaseElement from './BaseElement';
import Settings from './Settings';
import IPreset from '../presets/IPreset';

export default class Row extends BaseElement {
    public static readonly CMD_INSERT_AFTER_ROW = 'rowInsertAfter';
    public static readonly CMD_INSERT_BEFORE_ROW = 'rowInsertBefore';
    public static readonly CMD_DELETE_ROW = 'rowDelete';

    public static readonly BTN_ROW_INSERT_AFTER = 'row_insert_after';
    public static readonly BTN_ROW_INSERT_BEFORE = 'row_insert_before';
    public static readonly BTN_ROW_DELETE = 'row_delete';

    constructor(protected settings: Settings, protected preset: IPreset, protected editor: Editor, protected i18n: I18n) {
        super(settings, editor, i18n);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.insertAfter = this.insertAfter.bind(this);
        this.insertBefore = this.insertBefore.bind(this);
        this.delete = this.delete.bind(this);

        // Buttons
        editor.ui.registry.addButton(Row.BTN_ROW_INSERT_AFTER, {
            icon: 'table-insert-row-after',
            tooltip: i18n.translate('grid.row.insert_after'),
            onAction: this.insertAfter
        });
        editor.ui.registry.addButton(Row.BTN_ROW_INSERT_BEFORE, {
            icon: 'table-insert-row-above',
            tooltip: i18n.translate('grid.row.insert_before'),
            onAction: this.insertBefore
        });
        editor.ui.registry.addButton(Row.BTN_ROW_DELETE, {
            icon: 'table-delete-row',
            tooltip: i18n.translate('grid.row.remove'),
            onAction: this.delete
        });
    }

    /**
     * Inserts Row element after selection
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private insertAfter(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        this.insert(api, 'after');
    }

    /**
     * Inserts Row element before selection
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private insertBefore(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        this.insert(api, 'before');
    }

    /**
     * Inserts Row element
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private insert(api: Ui.Toolbar.ToolbarButtonInstanceApi, value: string): boolean {
        const element: HTMLElement = <HTMLElement> this.getElementRow();
        if (element) {
            const newRow = this.preset.renderRow();
            if (value === 'after') {
                element.parentNode.insertBefore(newRow, element.nextSibling);
            } else {
                element.parentNode.insertBefore(newRow, element);
            }
            return true;
        }
        return false;
    }

    /**
     * Deletes selected Row element
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private delete(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        const element: HTMLElement = <HTMLElement> this.getElementRow();
        if (element) {
            this.editor.dom.remove(element);
        }
    }
}