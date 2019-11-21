import {Editor} from 'tinymce';
import BaseElement from './BaseElement';

export default class Grid extends BaseElement {

    private static readonly CMD_INSERT_GRID = 'gridInsert';
    private static readonly CMD_DELETE_GRID = 'gridDelete';

    private static readonly MENU_INSERT_GRID = 'grid_insert';

    private static readonly BTN_DELETE_GRID = 'grid_delete';

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
            text: 'Insert grid',
            cmd: Grid.CMD_INSERT_GRID,
            context: 'insert'
        });

        editor.addButton(Grid.BTN_DELETE_GRID, {
            icon: 'remove',
            text: 'Delete grid',
            cmd: Grid.CMD_DELETE_GRID,
            context: 'delete'
        });

        this.editor.addContextToolbar(this.getElementColumn, `${Grid.BTN_DELETE_GRID} | column | row`);
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
        const element = this.getElement();
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