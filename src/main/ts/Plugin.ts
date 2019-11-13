import Noneditable from './core/Noneditable';
import Grid from './core/Grid';
import Row from './core/Row';
import Column from './core/Column';

declare const tinymce: any;

const setup = (editor, url) => {
  const noneditable = new Noneditable(editor);
  const grid = new Grid(editor);
  const row = new Row(editor);
  const column = new Column(editor);
};

export default () => {
  tinymce.PluginManager.add('tinymce-plugin-grid', setup);
};
