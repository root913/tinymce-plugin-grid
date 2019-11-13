declare const tinymce: any;

const setup = (editor, url) => {
  editor.ui.registry.addButton('tinymce-plugin-grid', {
    text: 'tinymce-plugin-grid button',
    onAction: () => {
      // tslint:disable-next-line:no-console
      editor.setContent('<p>content added from tinymce-plugin-grid</p>');
    }
  });
};

export default () => {
  tinymce.PluginManager.add('tinymce-plugin-grid', setup);
};
