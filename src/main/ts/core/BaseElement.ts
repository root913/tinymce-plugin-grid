import {Editor} from 'tinymce';

export default class BaseElement {
    constructor(protected editor: Editor) {
        this.getElement = this.getElement.bind(this);
        this.getElementColumn = this.getElementColumn.bind(this);
        this.getElementRow = this.getElementRow.bind(this);
        this.selectElement = this.selectElement.bind(this);
    }

    protected cmd(command: string, value: any = null) {
        return () => this.editor.execCommand(command, false, value);
    }

    protected getElement() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.grid');
    }

    protected getElementColumn() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.grid-col');
    }

    protected getElementRow() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.grid-row');
    }

    protected selectElement(target: any) {
        const element = this.getElementColumn();

        if (element) {
            this.editor.selection.collapse();
            this.editor.focus(false);
        }
    }
}