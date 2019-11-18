import BaseElement from './BaseElement';

export default class Grid extends BaseElement {

    private static readonly CMD_INSERT_GRID = 'editoInsertGrid';

    constructor(protected editor: any) {
        super(editor);

        this.insert = this.insert.bind(this);

        editor.addCommand(Grid.CMD_INSERT_GRID, this.insert);

        editor.addMenuItem('grid_insert', {
            icon: 'copy',
            text: 'grid.insert',
            cmd: Grid.CMD_INSERT_GRID,
            context: 'insert'
        });
        // editor.addCommand('editoInsertGrid', function(ui, value)
        // {
        //     var element = getElement();

        //     if (!element)
        //     {
        //         editor.execCommand('mceInsertContent', false, template());
        //     }
        // });
    }

    private insert(ui, value) {
        console.log(this);
        const element = this.getElement();
        if (!element) {
            this.editor.execCommand('mceInsertContent', false, this.template());
        }
    }

    private template() {
        const node = `
        <div class="edito-grid editoNonEditable">
            <div class="edito-row row editoNonEditable">
                <div class="edito-col col-sm-12 col-lg-6 editoNonEditable">Column 1</div>
                <div class="edito-col col-sm-12 col-lg-6 editoNonEditable">Column 2</div>
            </div>
        </div>`;
        return node;
    }
}