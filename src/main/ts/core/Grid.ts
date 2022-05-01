import { Editor, I18n, Ui } from 'tinymce';
import BaseElement from './BaseElement';
import Settings from './Settings';
import Column from './Column';
import Row from './Row';
import IPreset from '../presets/IPreset';

export default class Grid extends BaseElement {
    public static readonly CONTEXT_TOOLBAR = 'toolbar';
    public static readonly BTN_INSERT_GRID = 'grid_insert';
    public static readonly BTN_DELETE_GRID = 'grid_delete';

    constructor(protected settings: Settings, protected preset: IPreset, protected editor: Editor, protected i18n: I18n) {
        super(settings, editor, i18n);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);

        // // Buttons
        editor.ui.registry.addButton(Grid.BTN_INSERT_GRID, {
            icon: 'table',
            text: i18n.translate('grid.insert'),
            onAction: this.insert
        });

        editor.ui.registry.addButton(Grid.BTN_DELETE_GRID, {
            icon: 'table-delete-table',
            text: i18n.translate('grid.remove'),
            onAction: this.delete
        });

        editor.ui.registry.addContextToolbar(Grid.CONTEXT_TOOLBAR, {
            predicate: this.isElementColumn,
            scope: 'editor',
            position: 'node',
            items: `${Grid.BTN_DELETE_GRID} | ${Column.BTN_COLUMN_PROPERTIES} ${Column.BTN_COLUMN_INSERT_AFTER} ${Column.BTN_COLUMN_INSERT_BEFORE} ${Column.BTN_COLUMN_DELETE} | ${Row.BTN_ROW_INSERT_AFTER} ${Row.BTN_ROW_INSERT_BEFORE} ${Row.BTN_ROW_DELETE}`
        })
    }

    /**
     * Inserts new Grid element
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private insert(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        const element = this.getElement();
        if (!element) {
            this.editor.execCommand('mceInsertContent', false, this.preset.renderContainer().outerHTML);
        }
    }

    /**
     * Deletes selected Grid element
     *
     * @param   {Ui.Toolbar.ToolbarButtonInstanceApi}  api
     *
     * @return  {void}
     */
    private delete(api: Ui.Toolbar.ToolbarButtonInstanceApi): void {
        const element: HTMLElement = <HTMLElement> this.getElement();
        if (element) {
            this.editor.dom.remove(element);
        }
    }
}