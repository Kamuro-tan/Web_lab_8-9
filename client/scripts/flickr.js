
var flickr_ajax = function(flickerAPI) {
    var images = [];

    $.ajax({
        url: flickerAPI,
        dataType: "jsonp", // jsonp
        jsonpCallback: 'jsonFlickrFeed', // add this property
        success: function (result, status, xhr) {
            $.each(result.items, function (i, item) {
                images.push(item.media.m);
                if (i === 10) {
                    return false;
                }
            });

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            $(".flickr_slide_show").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });

    return images;
}

var main = function () {
    var flickerAPI = "//api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + $("#flickr_search").val();
    // var images = flickr_ajax(flickerAPI);
    var images = [];

    var displayImage = function (imageIndex) {
        var $img = $("<img>").attr("src", images[imageIndex]);
        $('.flickr_slide_show').empty();
        $('.flickr_slide_show').append($img);
        $img.fadeIn();

        setTimeout(function () {
            if (imageIndex < images.length - 1) {
                imageIndex = imageIndex + 1;
            } else {
                imageIndex = 0;
            }

            displayImage(imageIndex);
        }, 3000);

    };

    $("#flickr_submit").on('click', function() {
        flickerAPI = "//api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + $("#flickr_search").val();
        images = flickr_ajax(flickerAPI);
        return false;
    });

    displayImage(0);

}


$(document).ready(main);
