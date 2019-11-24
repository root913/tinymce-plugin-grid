import {Editor} from 'tinymce';
import BaseElement from './BaseElement';
import Column from './Column';
import Row from './Row';

export default class Grid extends BaseElement {

    public static readonly CMD_INSERT_GRID = 'gridInsert';
    public static readonly CMD_DELETE_GRID = 'gridDelete';

    public static readonly MENU_INSERT_GRID = 'grid_insert';

    public static readonly BTN_DELETE_GRID = 'grid_delete';

    constructor(protected editor: Editor) {
        super(editor);

        // Binds commands
        this.insert = this.insert.bind(this);
        this.delete = this.delete.bind(this);

        // Commands
        editor.addCommand(Grid.CMD_INSERT_GRID, this.insert);
        editor.addCommand(Grid.CMD_DELETE_GRID, this.delete);

        // Menu items
        editor.addMenuItem(Grid.MENU_INSERT_GRID, {
            icon: 'table',
            text: 'grid.insert',
            cmd: Grid.CMD_INSERT_GRID,
            context: 'insert'
        });

        editor.addButton(Grid.BTN_DELETE_GRID, {
            icon: 'tabledelete',
            cmd: Grid.CMD_DELETE_GRID,
            context: 'delete',
            tooltip: 'Delete grid',
        });

        this.editor.addContextToolbar(this.isElementColumn, `${Grid.BTN_DELETE_GRID} | ${Column.BTN_COLUMN_PROPERTIES} ${Column.BTN_COLUMN_INSERT_AFTER} ${Column.BTN_COLUMN_INSERT_BEFORE} ${Column.BTN_COLUMN_DELETE} | ${Row.BTN_ROW_INSERT_AFTER} ${Row.BTN_ROW_INSERT_BEFORE} ${Row.BTN_ROW_DELETE}`);
        this.editor.addContextToolbar(this.isElementRow, `${Grid.BTN_DELETE_GRID} | ${Column.BTN_COLUMN_PROPERTIES} ${Column.BTN_COLUMN_INSERT_AFTER} ${Column.BTN_COLUMN_INSERT_BEFORE} ${Column.BTN_COLUMN_DELETE} | ${Row.BTN_ROW_INSERT_AFTER} ${Row.BTN_ROW_INSERT_BEFORE} ${Row.BTN_ROW_DELETE}`);
    }

    private insert(ui: boolean, value: object): boolean {
        const element = this.getElement();
        if (!element) {
            this.editor.execCommand('mceInsertContent', false, this.template());
            return true;
        }
        return false;
    }

    private delete(ui: boolean, value: object): boolean {
        const element: HTMLElement = <HTMLElement> this.getElement();
        if (element) {
            this.editor.dom.remove(element);
            return true;
        }
        return false;
    }

    private template() {
        const node = `
        <div class="grid container editoNonEditable">
            <div class="grid-row row editoNonEditable">
                <div class="grid-col col-lg-12 editoNonEditable">Lorem ipsum</div>
            </div>
        </div>`;
        return node;
    }
}