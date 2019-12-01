import {Editor} from 'tinymce';

export default class Settings {
    private static readonly presets = [
        'Bootstrap3',
        'Foundation5'
    ];
    constructor(protected editor: Editor) {}

    public get preset(): string {
        const preset = this.editor.getParam('grid_preset', Settings.presets[0]);
        if (Settings.presets.indexOf(preset) !== -1) {
            return preset;
        }
        throw new Error(`Grid preset '${preset}' could not be found!`);
    }

}