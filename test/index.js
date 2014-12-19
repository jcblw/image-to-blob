
var test = require( 'tape' ),   
    imageToBlob = require( '../' ),
    datauri = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzAiIGhlaWdodD0iMTIwIiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiID48c3R5bGUgIHR5cGU9InRleHQvY3NzIiA+PCFbQ0RBVEFbLnN0MHtmaWxsOiNFRTY3QTQ7fS5zdDF7ZmlsbDojMjMxRjIwO30uc3Qye2ZpbGw6IzM1QkVCODt9XV0+PC9zdHlsZT48cGF0aCAgZD0iTTAgMGgxMjB2MTIwaC0xMjB6IiBjbGFzcz0ic3QwIiA+PC9wYXRoPjxwYXRoICBkPSJNMTEwIDYyaDEwdjIwaC0xMHoiIGNsYXNzPSJzdDEiID48L3BhdGg+PHBhdGggIGQ9Ik0xMjAgNjJoMTB2MjBoLTEweiIgY2xhc3M9InN0MiIgPjwvcGF0aD48cGF0aCAgZD0iTTI0IDMzaDR2NGgtNHpNMzIgMzNoNHY0aC00ek0yOCAzN2g0djRoLTR6TTI0IDQxaDR2NGgtNHpNMzIgNDFoNHY0aC00ek03NiAzM2g0djRoLTR6TTg0IDMzaDR2NGgtNHpNODAgMzdoNHY0aC00ek03NiA0MWg0djRoLTR6TTg0IDQxaDR2NGgtNHpNNDQgNTNoNHY0aC00ek00OCA1N2gxMnY0aC0xMnpNNjAgNTNoNHY0aC00ek0yMCA4MWg4djRoLTh6TTI4IDc3aDh2NGgtOHpNMzYgNzNoMzJ2NGgtMzJ6TTY4IDc3aDE2djRoLTE2ek04NCA4MWg4djRoLTh6TTkyIDg1aDh2NGgtOHoiIGNsYXNzPSJzdDEiID48L3BhdGg+PC9zdmc+';

test( 'testing the image-to-blob::getMimeTypeFromUrl', function( t ) {
    var getMimeTypeFromUrl = imageToBlob.getMimeTypeFromUrl;
    t.equals( typeof getMimeTypeFromUrl, 'function', 'image-to-blob::getMimeTypeFromUrl is a function' );
    t.equals( getMimeTypeFromUrl(), null, 'if nothing is given to getMimeTypeFromUrl then nothing is returned' );
    t.equals( getMimeTypeFromUrl( 'foo.bar.jpg' ), 'image/jpeg', 'if url is given with .jpg as file extension `image/jpeg` is returned' );
    t.equals( getMimeTypeFromUrl( 'foo.bar.jpeg' ), 'image/jpeg', 'if url is given with .jpeg as file extension `image/jpeg` is returned' );
    t.equals( getMimeTypeFromUrl( 'foo.bar.png' ), 'image/png', 'if url is given with .png as file extension `image/png` is returned' );
    t.equals( getMimeTypeFromUrl( 'foo.bar.svg' ), 'image/svg+xml', 'if url is given with .svg as file extension `image/svg+xml` is returned' );
    t.equals( getMimeTypeFromUrl( 'foo.bar.png?baz=qux.bar' ), 'image/png', 'if url is given with query string and .png as file extension `image/png` is returned' );

    t.end();
} );

test( 'testing image-to-blob::dataURItoBlob', function( t ) {
    var dataURItoBlob = imageToBlob.dataURItoBlob;
    t.equals( typeof dataURItoBlob, 'function', 'image-to-blob::dataURItoBlob is a function' );
    t.equals( typeof dataURItoBlob( datauri ), 'object', 'dataURItoBlob returns an object when given a valid datauri' );
    t.equals( dataURItoBlob( datauri ).type, 'image/svg+xml', 'dataURItoBlob returns the correct type' );
    t.end();
} );


test( 'testing image-to-blob::_handleImageToURI', function( t ) {
    var handleImageToURI = imageToBlob._handleImageToURI;

    t.equals( typeof handleImageToURI, 'function', 'image-to-blob::handleImageToURI is a function' );

    handleImageToURI({
        callback: function( err, blob ) {
            t.equals( typeof blob, 'object', 'blob is passed to the callback of handleImageToURI' );
            t.end();
        }
    }, null, datauri );
} );

test( 'testing image-to-blob', function( t ) {
    t.equals( typeof imageToBlob, 'function', 'image-to-blob is a function' );
    t.end();
} );