import { KeyboardEvent } from '@ephox/dom-globals';

export default class Noneditable {
    private classNames = [
        'edito-col'
    ];

    constructor(private editor) {
        this.onKeyDown.bind(this);
        editor.on('keydown', this.onKeyDown);
    }

    private onKeyDown(event: KeyboardEvent) {
        const keycode = event.charCode || event.keyCode;
        if (keycode === 8) {
            if (this.editor.selection.getRng().startOffset === 0) {
                this.classNames.forEach((name) => {
                    if (this.editor.selection.getNode().classList.contains(`.${name}`)) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        }
    }
}