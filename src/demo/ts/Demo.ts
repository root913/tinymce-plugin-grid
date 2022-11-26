import Plugin from '../../main/ts/Plugin';

declare let tinymce: any;

Plugin();

// Bootstrap3 demo
tinymce.init({
    selector: 'textarea#bootstrap3',
    plugins: [
        'grid'
    ],
    toolbar: 'undo redo | formatselect | ' +
    ' bold italic backcolor | alignleft aligncenter ' +
    ' alignright alignjustify | bullist numlist outdent indent |' +
    ' removeformat | help | grid_insert',
    height : '250',
    grid_preset: 'Bootstrap3'
});

// Bootstrap4 demo
tinymce.init({
    selector: 'textarea#bootstrap4',
    plugins: [
        'grid'
    ],
    toolbar: 'undo redo | formatselect | ' +
    ' bold italic backcolor | alignleft aligncenter ' +
    ' alignright alignjustify | bullist numlist outdent indent |' +
    ' removeformat | help | grid_insert',
    height : '250',
    grid_preset: 'Bootstrap4'
});

// Bootstrap5 demo
tinymce.init({
    selector: 'textarea#bootstrap5',
    plugins: [
        'grid'
    ],
    toolbar: 'undo redo | formatselect | ' +
    ' bold italic backcolor | alignleft aligncenter ' +
    ' alignright alignjustify | bullist numlist outdent indent |' +
    ' removeformat | help | grid_insert',
    height : '250',
    grid_preset: 'Bootstrap5'
});

// Foundation demo
tinymce.init({
    selector: 'textarea#foundation',
    plugins: [
        'grid'
    ],
    toolbar: 'undo redo | formatselect | ' +
    ' bold italic backcolor | alignleft aligncenter ' +
    ' alignright alignjustify | bullist numlist outdent indent |' +
    ' removeformat | help | grid_insert',
    height : '250',
    grid_preset: 'Foundation5'
});
