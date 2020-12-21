import './../langs/pl';
import './../langs/en';
import Noneditable from './core/Noneditable';
import Grid from './core/Grid';
import Row from './core/Row';
import Column from './core/Column';
import { Editor } from 'tinymce';
import Settings from './core/Settings';
// Presets
import Bootstrap3 from './presets/Bootstrap3';
import Bootstrap4 from './presets/Bootstrap4';
import Foundation5 from './presets/Foundation5';

declare const tinymce: any;

const presets = {
    Bootstrap3,
    Bootstrap4,
    Foundation5,
};

const resolvePreset = (settings: Settings, editor: Editor) => new presets[settings.preset]();

const setup = async (editor: Editor, url: string) => {
    /* tslint:disable:no-unused-variable */
    const settings = new Settings(editor);

    const preset = resolvePreset(settings, editor);
    editor.contentCSS.push(url + `/${preset.style()}`);

    const noneditable = new Noneditable(settings, editor, tinymce.util.I18n);
    const row = new Row(settings, preset, editor, tinymce.util.I18n);
    const column = new Column(settings, preset, editor, tinymce.util.I18n);
    const grid = new Grid(settings, preset, editor, tinymce.util.I18n);
};

export default () => {
    tinymce.PluginManager.requireLangPack('grid');
    tinymce.PluginManager.add('grid', setup);
};
