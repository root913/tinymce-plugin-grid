import {Editor} from 'tinymce';

export default class BaseElement {
    constructor(protected editor: Editor) {
        this.getElement = this.getElement.bind(this);
        this.isElement = this.isElement.bind(this);
        this.getElementColumn = this.getElementColumn.bind(this);
        this.isElementColumn = this.isElementColumn.bind(this);
        this.getElementRow = this.getElementRow.bind(this);
        this.isElementRow = this.isElementRow.bind(this);
        this.selectElement = this.selectElement.bind(this);
    }

    protected cmd(command: string, value: any = null) {
        return () => this.editor.execCommand(command, false, value);
    }

    protected getElement() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.grid');
    }

    protected isElement() {
        return !!this.getElement();
    }

    protected getElementColumn() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.grid-col');
    }

    protected isElementColumn() {
        return !!this.getElementColumn();
    }

    protected getElementRow() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.grid-row');
    }

    protected isElementRow() {
        return !!this.getElementRow();
    }

    protected selectElement(target: any) {
        const element = this.getElementColumn();

        if (element) {
            this.editor.selection.collapse();
            this.editor.focus(false);
        }
    }
}