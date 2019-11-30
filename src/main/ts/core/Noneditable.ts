import { KeyboardEvent } from '@ephox/dom-globals';
import { Editor } from 'tinymce';

export default class Noneditable {
    private classNames = [
        'grid-col',
        'grid-row'
    ];

    constructor(private editor: Editor) {
        this.onKeyDown = this.onKeyDown.bind(this);
        editor.on('keydown', this.onKeyDown);
    }

    private onKeyDown(event: KeyboardEvent) {
        const keycode = event.charCode || event.keyCode;
        // Backspace
        if (keycode === 8) {
            if (this.editor.selection.getRng(false).startOffset <= 0) {
                this.classNames.forEach((name) => {
                    if (this.editor.selection.getNode().classList.contains(`${name}`)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        }
        // Delete
        if (keycode === 46) {
            event.preventDefault();
            return false;
        }
    }
}