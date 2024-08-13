tinymce.init({
    selector: '#wysiwyg-editor',
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount emoticons fontfamily fontsize',
    toolbar: 'undo redo | formatselect | fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist | link image media table | code fullscreen | preview anchor emoticons | help',
    menubar: 'file edit view insert format tools table help',
    toolbar_sticky: true,
    toolbar_mode: 'sliding',
    content_style: 'body { font-family:Arial,Helvetica,sans-serif; font-size:14px }',
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    language: 'pt_BR',
    file_picker_callback: function (callback, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function () {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                callback(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    },
    setup: function (editor) {
        editor.ui.registry.addButton('mycustombutton', {
            text: 'Custom Button',
            icon: 'star',
            onAction: function () {
                editor.insertContent('&nbsp;<b>It\'s my button!</b>&nbsp;');
            }
        });
    }
});

function saveContent() {
    const content = tinymce.get("wysiwyg-editor").getContent();
    const blob = new Blob([content], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "e-mkt.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Salvo como HTML!");
}