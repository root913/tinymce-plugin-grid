import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

tinymce.init({
    selector: 'textarea.tinymce',
    plugins: 'code grid',
    toolbar: 'grid',
});
