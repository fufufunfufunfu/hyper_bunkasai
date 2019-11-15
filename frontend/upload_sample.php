<?php
    // $fp = fopen($_FILES['upfile']['tmp_name'], "rb");
    // $img = fread($fp, filesize($_FILES['upfile']['tmp_name']));
    // fclose($fp);

    // $enc_img = base64_encode($img);

    // $imginfo = getimagesize('data:application/octet-stream;base64,' . $enc_img);

    // echo '<img src="data:' . $imginfo['mime'] . ';base64,'.$enc_img.'">';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<input type="file" id="fileInput">
<button id="post-btn">送信</button>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
    <script>
    const domain = document.domain
    axios.get(`/api/user/list`,{
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }).then(res => {
        window.console.log(res.data)
    })
    const postBtn = document.getElementById('post-btn')
    const params = new FormData()
    let file
    
    postBtn.addEventListener('click', () => {
        window.console.log(params)
        axios.post('http://localhost:3000/photo', params, {
            header: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            window.console.log(res)
        })
    })

    function updateFile(e) {
        file = e.target.files[0]
        params.append('photo', file)
        window.console.log(file)
        window.console.log(params)
    }

    document.getElementById('fileInput').addEventListener('change', updateFile)
    </script>
</body>
</html>