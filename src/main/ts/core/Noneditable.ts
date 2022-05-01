import { Editor, EditorEvent, Events, I18n } from 'tinymce';
import Settings from './Settings';

export default class Noneditable {
    private classNames = [
        'grid-container',
        'grid-row',
        'grid-col',
    ];

    constructor(private settings: Settings, private editor: Editor, private i18n: I18n) {
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onBeforeExecCommand = this.onBeforeExecCommand.bind(this);
        editor.on('keydown', this.onKeyDown);
        editor.on('BeforeExecCommand', this.onBeforeExecCommand);
    }

    private onKeyDown(event: EditorEvent<globalThis.KeyboardEvent>) {
        // Backspace
        const selection = this.editor.selection.getNode();
        const selectionParent = selection.parentNode as Element;
        const rng = this.editor.selection.getRng();
        if (event.key === 'Backspace') {
            if (rng.startOffset > 0) {
                return;
            }
            if (rng.startOffset <= 0) {
                if (this.classNames.some((className) => selection.classList.contains(className))) {
                    event.preventDefault();
                    return false;
                }
            }
            if (selectionParent && selectionParent.childElementCount === 1) {
                if (this.classNames.some((className) => selectionParent.classList.contains(className))) {
                    if (!this.classNames.some((className) => selection.classList.contains(className))) {
                        if (rng.startOffset <= 0) {
                                event.preventDefault();
                                return false;
                        }
                        this.editor.undoManager.transact(() => {
                            this.editor.dom.remove(selection);
                            this.editor.execCommand('mceInsertContent', false, this.editor.dom.createHTML('p'));
                        });
                    }
                    event.preventDefault();
                    return false;
                }
            }
        }
        // Delete
        if (event.key === 'Delete') {
            if (selectionParent && selectionParent.childElementCount === 1) {
                if (this.classNames.some((className) => selectionParent.classList.contains(className))) {
                    event.preventDefault();
                    return false;
                }
            }
            if (rng.startOffset > 0) {
                return;
            }
            if (this.classNames.some((className) => selection.classList.contains(className))) {
                event.preventDefault();
                return false;
            }
        }
    }

    private onBeforeExecCommand(event: EditorEvent<Events.ExecCommandEvent>) {
        if (event.command === 'InsertOrderedList' || event.command === 'InsertUnorderedList' || event.command === 'InsertDefinitionList') {
            const selection = this.editor.selection.getNode();
            this.classNames.forEach((name) => {
                if (selection.classList.contains(`${name}`)) {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
}