export default class BaseElement {
    constructor(protected editor: any) {}

    protected getElementColumn() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.edito-col');
    }

    protected getElement() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.edito-grid');
    }

    protected getElementRow() {
        return this.editor.dom.getParent(this.editor.selection.getStart(), '.edito-row');
    }

    protected selectElement(target: any) {
        const element = this.getElementColumn();

        if (element) {
            this.editor.selection.collapse();
            this.editor.focus();
        }
    }
}