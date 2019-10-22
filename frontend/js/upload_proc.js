$('#uploadBtn').change(function () {
    if (this.files.length > 0) {
        // 選択されたファイル情報を取得
        file = this.files[0];

        // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
        var reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file);

        reader.onload = function () {
            $('#uploadImg').attr('src', reader.result);
        }
    }
});

$('#uploadBtn').change(function () {
    $('#viewWrapper').css({
        'display': 'block',
        'opacity': '1.0'
    });
    imgChanged();
});
$('#cancelBtn').on('click', function () {
    console.log(file);
    $('#viewWrapper').css({
        'display': 'none',
        'opacity': '0.0'
    });
});

function imgChanged() {
    console.log('image was changed.');
    $('#uploadImgFrame').css({
        'background-color': '#000'
    });
    $('#uploadImg').each(function () {
        var upImg = document.getElementById('uploadImg');
        var img_width = upImg.clientWidth;
        var img_height = upImg.clientHeight;

        console.log(img_width);
        console.log(img_height);

        if ((img_width / img_height) >= 1) {
            $('#uploadImgFrame').css("height", "auto");
        } else {
            $('#uploadImgFrame').css("height", "100%");
        }
    });
};