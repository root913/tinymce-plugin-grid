import logo from './logo.svg';
import './App.css';
import React, { useRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';

import { Editor } from '@tinymce/tinymce-react';

const exampleHtml = `<div>
<div class="grid-container container">
<div class="grid-row row">
<div class="grid-col col-sm-12 col-sm-12 col-md-12 col-lg-6">
<p>Lorem ipsum</p>
</div>
<div class="grid-col col-xs-6 col-sm-6 col-md-6 col-lg-6">
<p>Lorem ipsum</p>
</div>
</div>
</div>
</div>`;

function App() {
    const editorRef = useRef(null);
    const [content, setContent] = useState('');

    const setEditorRef = (event, editor) => {
        editorRef.current = editor;
        setContent(exampleHtml);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Editor
                value={content}
                image_uploadtab={true}
                onInit={setEditorRef}
                init={{
                    external_plugins: {
                        grid: 'http://localhost/grid/plugin.js'
                    },
                    relative_urls: false,
                    remove_script_host: false,
                    convert_urls: true,
                    height: 500,
                    toolbar_sticky: true,
                    image_caption: true,
                    plugins: 'grid image link media template table charmap hr nonbreaking anchor insertdatetime advlist lists wordcount code help charmap',
                    menubar: 'file edit view insert format tools table help',
                    toolbar: 'grid_insert | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | code',
                    toolbar_mode: 'sliding',
                    contextmenu: 'link image imagetools table',
                    automatic_uploads: true,
                    paste_data_images: true,
                }}
            />
        </div>
    );
}

export default App;
