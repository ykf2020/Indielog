import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor'

const editorConfiguration = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'imageInsert', 'MediaEmbed', 'InsertTable', 'Undo', 'Redo' ],
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
        ]
    },
    mediaEmbed: {
        previewsInData: true
    },
    ckfinder: {

    }
};
const CKE = ({ handleCkeditorContent, data }) => {
  return (
    <>
      <CKEditor
        data={data}
        editor={Editor}
        onReady={ editor => {
        }}
        onChange={handleCkeditorContent}
        config={editorConfiguration}
      />
    </>
  )
}

export default CKE
