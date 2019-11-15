const params = new FormData()
let file

$('#uploadBtn').change(function () {
    // fileの読み出し
    if (this.files.length > 0) {
        // 選択されたファイル情報を取得
        file = this.files[0];
        params.set('photo', file)

        // readerのresultプロパティに、データURLとしてエンコードされたファイルデータを格納
        var reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file);

        reader.onload = function () {
            $('#uploadImg').attr('src', reader.result);
        }
    }

    // fadeの色をランダムで選択する
    var fade_random = Math.floor(Math.random() * 5) + 1;
    console.log('fade is number _0' + fade_random);
    $('#fadeWrapper').removeClass('_c01 _c02 _c03 _c04 _c05');
    if (fade_random == 1) {
        $('#fadeWrapper').addClass('_c01');
    }
    if (fade_random == 2) {
        $('#fadeWrapper').addClass('_c02');
    }
    if (fade_random == 3) {
        $('#fadeWrapper').addClass('_c03');
    }
    if (fade_random == 4) {
        $('#fadeWrapper').addClass('_c04');
    }
    if (fade_random == 5) {
        $('#fadeWrapper').addClass('_c05');
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
                    "width": "var(--frameSize)",
                    'height': 'auto'
                });
                $('#uploadImg').css({
                    "width": "100%",
                    'height': 'auto'
                });
                $('#uploadImgFrame').css({
                    "animation-name": "animPopImgWidth"
                });
                console.log('width is longer.');
            } else {
                $('#uploadImgFrame').css({
                    "width": "auto",
                    "height": "var(--frameSize)"
                });
                $('#uploadImg').css({
                    "width": "auto",
                    "height": "100%"
                });
                $('#uploadImgFrame').css({
                    "animation-name": "animPopImgHeight"
                });
                console.log('height is longer.');
            }
            console.log(img_width - img_height);
        });
    }, 500);
});

$('#submitInput').on('click', function () {
    $('#loadWrapper').css({
        'display': 'block',
        'opacity': '1.0'
    });
    $('#uploadImgFrame, ._fade').css({
        'animation-play-state': 'paused'
    });

    // upload function
    axios.post('http://localhost:3000/photo', params, {
        header: {
            'content-type': 'multipart/form-data'
        }
    }).then(res => {
        window.console.log(res)
        $('#loadWrapper, #submitBtn').css({
            'display': 'none'
        });
        $('#closeBtn').css({
            'display': 'block'
        });
        $('#uploadView').css({
            'background-color': '#88A80D'
        });
        $('#uploadImgFrame, ._fade').css({
            'animation-play-state': 'running'
        });
        $('#uploadView').find('span._01').text('アップロードが');
        $('#uploadView').find('span._02').text('完了しました。');
    })

    // setTimeout(function () {
    //     $('#loadWrapper, #submitBtn').css({
    //         'display': 'none'
    //     });
    //     $('#closeBtn').css({
    //         'display': 'block'
    //     });
    //     $('#uploadView').css({
    //         'background-color': '#88A80D'
    //     });
    //     $('#uploadImgFrame, ._fade').css({
    //         'animation-play-state': 'running'
    //     });
    //     $('#uploadView').find('span._01').text('アップロードが');
    //     $('#uploadView').find('span._02').text('完了しました。');
    // }, 5000);

    console.log('submitInput on clicked.');
});


$('.closeInput').on('click', function () {
    $('#viewWrapper').css({
        'display': 'none',
        'opacity': '0.0'
    });
    $('#uploadView').css({
        'background-color': '#e5328c'
    });
    $('#submitBtn').css({
        'display': 'block'
    });
    $('#closeBtn').css({
        'display': 'none'
    });
    $('#uploadView').find('span._01').text('この画像を');
    $('#uploadView').find('span._02').text('アップロードしますか？');
});