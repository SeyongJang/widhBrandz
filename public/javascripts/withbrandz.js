/**
 * Created by SEYONG on 2016-09-29.
 */

$(document).ready(function(){

    //preview image
    var imgTarget = $('.preview-image .upload-hidden');

    imgTarget.on('change', function () {
        var parent = $(this).parent();
        parent.children('.upload-display').remove();

        if (window.FileReader) {
            //image 파일만
            if (!$(this)[0].files[0].type.match(/image\//)) return;

            var reader = new FileReader();
            reader.onload = function (e) {
                var src = e.target.result;
                parent.append('<div class="upload-display"><div class="upload-thumb-wrap"><img src="' + src + '" class="upload-thumb"></div></div>');
            }
            reader.readAsDataURL($(this)[0].files[0]);

            //필드를 파일이름으로 변경
            var filename = $(this)[0].files[0].name;
            if($(this).is('.upload-name')){
                $(this).siblings('.upload-name').val(filename);
            } else {
                $(this).siblings('.upload-name').val(filename);
                //$(this).siblings('.upload-avatar').val(filename);
            }

        }

        else {
            $(this)[0].select();
            $(this)[0].blur();
            var imgSrc = document.selection.createRange().text;
            parent.append('<div class="upload-display"><div class="upload-thumb-wrap"><img class="upload-thumb"></div></div>');

            var img = $(this).siblings('.upload-display').find('img');
            img[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src=\"" + imgSrc + "\")";
        }
    });

    //replace hash tags
    document.getElementById('hashtags').addEventListener("change", function (){
        var str = this.value;
        str = str.replace(/\s+|,\s+/g, ",");
        var tagsArray=str.split(",");
        //console.log(str);
        for(var i=0; i<tagsArray.length; i++){
            if(tagsArray[i].indexOf("#")<0){
                tagsArray[i]="#"+tagsArray[i];
            }
        }
        //console.log(tagsArray);
        this.value = tagsArray.join(" ");
    });

    document.getElementById('brand-write-opinion').addEventListener("keyup", function(){
       resizeTextarea(this);
    });

    function resizeTextarea(obj){
        obj.style.height = "100px";
        obj.style.height = (2+obj.scrollHeight)+"px";
    }

    //
    // function isElementInViewport(el) {
    //     var rect = el.getBoundingClientRect();
    //     return (
    //         rect.top >= 0 &&
    //         rect.left >= 0 &&
    //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //     );
    // }
    // var items = document.querySelectorAll(".timeline li");
    //
    // // code for the isElementInViewport function
    //
    // function callbackFunc() {
    //
    //     for (var i = 0; i < items.length; i++) {
    //         if (isElementInViewport(items[i])) {
    //             items[i].classList.add("in-view");
    //         }
    //     }
    // }
    //
    // window.addEventListener("load", callbackFunc);
    // window.addEventListener("scroll", callbackFunc);

});
