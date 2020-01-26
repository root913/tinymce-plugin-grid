import Noneditable from './core/Noneditable';
import Grid from './core/Grid';
import Row from './core/Row';
import Column from './core/Column';
import { Editor } from 'tinymce';
import Settings from './core/Settings';
// Presets
import Bootstrap3 from './presets/Bootstrap3';
import Foundation5 from './presets/Foundation5';

declare const tinymce: any;

const setup = async (editor: Editor, url: string) => {
    /* tslint:disable:no-unused-variable */
    const settings = new Settings(editor);

    let preset = null;

    switch (settings.preset) {
        case 'Foundation5':
            preset = new Foundation5(settings, editor);
            break;
        default:
            preset = new Bootstrap3(settings, editor);
            break;
    }
    editor.contentCSS.push(url + `/${preset.style()}`);

    const noneditable = new Noneditable(settings, editor);
    const row = new Row(settings, preset, editor);
    const column = new Column(settings, preset, editor);
    const grid = new Grid(settings, preset, editor);
};

export default () => {
    tinymce.PluginManager.add('grid', setup);
    tinymce.PluginManager.requireLangPack('grid');
};
