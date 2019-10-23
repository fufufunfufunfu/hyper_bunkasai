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
    // 後処理
    setTimeout(function () {

        $('#viewWrapper').css({
            'display': 'block',
            'opacity': '1.0'
        });

        console.log('image was changed.');
        $('#uploadImg').each(function () {
            var upImg = document.getElementById('uploadImg');
            var img_width = upImg.clientWidth;
            var img_height = upImg.clientHeight;

            console.log('img_width = ' + img_width);
            console.log('img_height = ' + img_height);

            if ((img_width - img_height) >= 1) {
                $('#uploadImgFrame').css({
                    "width": "100%",
                    'height': 'auto'
                });
                $('#uploadImg').css({
                    "width": "100%",
                    'height': 'auto'
                });
                console.log('width is longer.');
            } else {
                $('#uploadImgFrame').css({
                    "width": "auto",
                    "height": "100%"
                });
                $('#uploadImg').css({
                    "width": "auto",
                    "height": "100%"
                });
                console.log('height is longer.');
            }
            console.log(img_width - img_height);
        });
    }, 500);
});


$('#cancelBtn').on('click', function () {
    $('#viewWrapper').css({
        'display': 'none',
        'opacity': '0.0'
    });
});