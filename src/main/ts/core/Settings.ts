import {Editor} from 'tinymce';

export default class Settings {
    private static readonly presets = [
        'Bootstrap3',
        'Bootstrap4',
        'Foundation5'
    ];
    constructor(protected editor: Editor) {}

    public get preset(): string {
        const preset = this.editor.getParam('grid_preset', Settings.presets[0]);
        if (!(preset in Settings.presets)) {
            return preset;
        }
        throw new Error(`Unknown grid preset "${preset}"`);
    }

}