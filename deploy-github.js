const ghpages = require('gh-pages')

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/root913/tinymce-plugin-grid.git',
    },
    () => {
        console.log('Deploy Complete!')
    }
)