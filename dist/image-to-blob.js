(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

'use strict';

var imageToUri = require( 'image-to-data-uri' );

/*
## Image to blob
----------------------------------------------------------------------
Converts remote image urls to blobs via canvas. 

```javascript
var imageToBlob = require( 'image-to-blob' );

imageToBlob( 'http://foo.bar/baz.png', function( err, uri ) { 
    console.log( uri ); 
} );
imageToBlob( document.getElementsByTagName( 'img' )[ 0 ], function( err, uri ) { 
    console.log( uri ); 
} );
```
*/

var types = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'svg': 'image/svg+xml' // this gets converted to png
};

module.exports = imageToBlob;
module.exports.dataURItoBlob = dataURItoBlob;
module.exports.handleImageToURI = handleImageToURI;
module.exports.getMimeTypeFromUrl = getType;

function imageToBlob( img, options, callback ) {
    
    var src;

    if ( typeof options === 'function' ) {
        callback = options;
        options = {};
    }

    options = options || {};

    if ( !img ) {
        return callback( new Error( 'Pass in a IMG DOM node or a url as first param' ) );
    }

    if ( typeof img === 'object' && img.tagName.toLowerCase() === 'img' ) {
        src = img.src;
    }

    if ( typeof img === 'string' ) {
        src = img;
    }


    options.type = types[ options.type ] || getType( src );
    options.src = src;
    options.callback = callback;
    if ( !options.type ) {

        callback( new Error( 'Image type is not supported' ) );
        return;
    }

    imageToUri( src, options.type, handleImageToURI.bind( null, options ) ); // attempt if we have a 
}

function dataURItoBlob( uri ) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString,
        mimeString,
        ia;

    if ( uri.split( ',' )[0].indexOf( 'base64' ) >= 0 ) {

        byteString = atob( uri.split(',')[1] );
    }
    else {

        byteString = unescape( uri.split(',')[1] );
    }

    // separate out the mime component
    mimeString = uri.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];

    // write the bytes of the string to a typed array
    ia = new Uint8Array( byteString.length );

    for ( var i = 0; i < byteString.length; i++ ) {
        
        ia[ i ] = byteString.charCodeAt( i );
    }

    return new Blob( [ ia ], {
        type: mimeString
    } );
}

function handleImageToURI( options, err, uri ) {

    if ( err ) {
        options.callback( err );
        return;
    }

    options.callback( null, dataURItoBlob( uri ) );

}

function getType( url ) {
    return types[ url.split( '?' ).shift( ).split( '.' ).pop( ) ];
}

},{"image-to-data-uri":2}],2:[function(require,module,exports){
// converts a URL of an image into a dataURI
module.exports = function (url, mimeType, cb) {
    // Create an empty canvas and image elements
    var canvas = document.createElement('canvas'),
        img = document.createElement('img');

    if ( typeof mimeType === 'function' ) {
        cb = mimeType;
        mimeType = null;
    }

    mimeType = mimeType || 'image/png';

    // allow for cross origin that has correct headers
    img.crossOrigin = "Anonymous"; 

    img.onload = function () {
        var ctx = canvas.getContext('2d');
        // match size of image
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        ctx.drawImage(img, 0, 0);

        // Get the data-URI formatted image
        cb( null, canvas.toDataURL( mimeType ) );
    };

    img.onerror = function () {
        cb(new Error('FailedToLoadImage'));
    };

    // canvas is not supported
    if (!canvas.getContext) {
        cb(new Error('CanvasIsNotSupported'));
    } else {
        img.src = url;
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2phY29iL1Byb2plY3RzL0hvbmUvaW1hZ2UtdG8tYmxvYi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qYWNvYi9Qcm9qZWN0cy9Ib25lL2ltYWdlLXRvLWJsb2IvZmFrZV8xNzFhYjlhMS5qcyIsIi9ob21lL2phY29iL1Byb2plY3RzL0hvbmUvaW1hZ2UtdG8tYmxvYi9ub2RlX21vZHVsZXMvaW1hZ2UtdG8tZGF0YS11cmkvaW1hZ2UtdG8tZGF0YS11cmkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1hZ2VUb1VyaSA9IHJlcXVpcmUoICdpbWFnZS10by1kYXRhLXVyaScgKTtcblxuLypcbiMjIEltYWdlIHRvIGJsb2Jcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbkNvbnZlcnRzIHJlbW90ZSBpbWFnZSB1cmxzIHRvIGJsb2JzIHZpYSBjYW52YXMuIFxuXG5gYGBqYXZhc2NyaXB0XG52YXIgaW1hZ2VUb0Jsb2IgPSByZXF1aXJlKCAnaW1hZ2UtdG8tYmxvYicgKTtcblxuaW1hZ2VUb0Jsb2IoICdodHRwOi8vZm9vLmJhci9iYXoucG5nJywgZnVuY3Rpb24oIGVyciwgdXJpICkgeyBcbiAgICBjb25zb2xlLmxvZyggdXJpICk7IFxufSApO1xuaW1hZ2VUb0Jsb2IoIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnaW1nJyApWyAwIF0sIGZ1bmN0aW9uKCBlcnIsIHVyaSApIHsgXG4gICAgY29uc29sZS5sb2coIHVyaSApOyBcbn0gKTtcbmBgYFxuKi9cblxudmFyIHR5cGVzID0ge1xuICAgICdwbmcnOiAnaW1hZ2UvcG5nJyxcbiAgICAnanBnJzogJ2ltYWdlL2pwZWcnLFxuICAgICdqcGVnJzogJ2ltYWdlL2pwZWcnLFxuICAgICdzdmcnOiAnaW1hZ2Uvc3ZnK3htbCcgLy8gdGhpcyBnZXRzIGNvbnZlcnRlZCB0byBwbmdcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW1hZ2VUb0Jsb2I7XG5tb2R1bGUuZXhwb3J0cy5kYXRhVVJJdG9CbG9iID0gZGF0YVVSSXRvQmxvYjtcbm1vZHVsZS5leHBvcnRzLmhhbmRsZUltYWdlVG9VUkkgPSBoYW5kbGVJbWFnZVRvVVJJO1xubW9kdWxlLmV4cG9ydHMuZ2V0TWltZVR5cGVGcm9tVXJsID0gZ2V0VHlwZTtcblxuZnVuY3Rpb24gaW1hZ2VUb0Jsb2IoIGltZywgb3B0aW9ucywgY2FsbGJhY2sgKSB7XG4gICAgXG4gICAgdmFyIHNyYztcblxuICAgIGlmICggdHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKCAhaW1nICkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soIG5ldyBFcnJvciggJ1Bhc3MgaW4gYSBJTUcgRE9NIG5vZGUgb3IgYSB1cmwgYXMgZmlyc3QgcGFyYW0nICkgKTtcbiAgICB9XG5cbiAgICBpZiAoIHR5cGVvZiBpbWcgPT09ICdvYmplY3QnICYmIGltZy50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbWcnICkge1xuICAgICAgICBzcmMgPSBpbWcuc3JjO1xuICAgIH1cblxuICAgIGlmICggdHlwZW9mIGltZyA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgIHNyYyA9IGltZztcbiAgICB9XG5cblxuICAgIG9wdGlvbnMudHlwZSA9IHR5cGVzWyBvcHRpb25zLnR5cGUgXSB8fCBnZXRUeXBlKCBzcmMgKTtcbiAgICBvcHRpb25zLnNyYyA9IHNyYztcbiAgICBvcHRpb25zLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgaWYgKCAhb3B0aW9ucy50eXBlICkge1xuXG4gICAgICAgIGNhbGxiYWNrKCBuZXcgRXJyb3IoICdJbWFnZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQnICkgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGltYWdlVG9VcmkoIHNyYywgb3B0aW9ucy50eXBlLCBoYW5kbGVJbWFnZVRvVVJJLmJpbmQoIG51bGwsIG9wdGlvbnMgKSApOyAvLyBhdHRlbXB0IGlmIHdlIGhhdmUgYSBcbn1cblxuZnVuY3Rpb24gZGF0YVVSSXRvQmxvYiggdXJpICkge1xuICAgIC8vIGNvbnZlcnQgYmFzZTY0L1VSTEVuY29kZWQgZGF0YSBjb21wb25lbnQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgICB2YXIgYnl0ZVN0cmluZyxcbiAgICAgICAgbWltZVN0cmluZyxcbiAgICAgICAgaWE7XG5cbiAgICBpZiAoIHVyaS5zcGxpdCggJywnIClbMF0uaW5kZXhPZiggJ2Jhc2U2NCcgKSA+PSAwICkge1xuXG4gICAgICAgIGJ5dGVTdHJpbmcgPSBhdG9iKCB1cmkuc3BsaXQoJywnKVsxXSApO1xuICAgIH1cbiAgICBlbHNlIHtcblxuICAgICAgICBieXRlU3RyaW5nID0gdW5lc2NhcGUoIHVyaS5zcGxpdCgnLCcpWzFdICk7XG4gICAgfVxuXG4gICAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICAgIG1pbWVTdHJpbmcgPSB1cmkuc3BsaXQoICcsJyApWyAwIF0uc3BsaXQoICc6JyApWyAxIF0uc3BsaXQoICc7JyApWyAwIF07XG5cbiAgICAvLyB3cml0ZSB0aGUgYnl0ZXMgb2YgdGhlIHN0cmluZyB0byBhIHR5cGVkIGFycmF5XG4gICAgaWEgPSBuZXcgVWludDhBcnJheSggYnl0ZVN0cmluZy5sZW5ndGggKTtcblxuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgIFxuICAgICAgICBpYVsgaSBdID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KCBpICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBCbG9iKCBbIGlhIF0sIHtcbiAgICAgICAgdHlwZTogbWltZVN0cmluZ1xuICAgIH0gKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VUb1VSSSggb3B0aW9ucywgZXJyLCB1cmkgKSB7XG5cbiAgICBpZiAoIGVyciApIHtcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjayggZXJyICk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvcHRpb25zLmNhbGxiYWNrKCBudWxsLCBkYXRhVVJJdG9CbG9iKCB1cmkgKSApO1xuXG59XG5cbmZ1bmN0aW9uIGdldFR5cGUoIHVybCApIHtcbiAgICByZXR1cm4gdHlwZXNbIHVybC5zcGxpdCggJz8nICkuc2hpZnQoICkuc3BsaXQoICcuJyApLnBvcCggKSBdO1xufVxuIiwiLy8gY29udmVydHMgYSBVUkwgb2YgYW4gaW1hZ2UgaW50byBhIGRhdGFVUklcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgbWltZVR5cGUsIGNiKSB7XG4gICAgLy8gQ3JlYXRlIGFuIGVtcHR5IGNhbnZhcyBhbmQgaW1hZ2UgZWxlbWVudHNcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXG4gICAgICAgIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgaWYgKCB0eXBlb2YgbWltZVR5cGUgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgIGNiID0gbWltZVR5cGU7XG4gICAgICAgIG1pbWVUeXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICBtaW1lVHlwZSA9IG1pbWVUeXBlIHx8ICdpbWFnZS9wbmcnO1xuXG4gICAgLy8gYWxsb3cgZm9yIGNyb3NzIG9yaWdpbiB0aGF0IGhhcyBjb3JyZWN0IGhlYWRlcnNcbiAgICBpbWcuY3Jvc3NPcmlnaW4gPSBcIkFub255bW91c1wiOyBcblxuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgLy8gbWF0Y2ggc2l6ZSBvZiBpbWFnZVxuICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuXG4gICAgICAgIC8vIENvcHkgdGhlIGltYWdlIGNvbnRlbnRzIHRvIHRoZSBjYW52YXNcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuXG4gICAgICAgIC8vIEdldCB0aGUgZGF0YS1VUkkgZm9ybWF0dGVkIGltYWdlXG4gICAgICAgIGNiKCBudWxsLCBjYW52YXMudG9EYXRhVVJMKCBtaW1lVHlwZSApICk7XG4gICAgfTtcblxuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYihuZXcgRXJyb3IoJ0ZhaWxlZFRvTG9hZEltYWdlJykpO1xuICAgIH07XG5cbiAgICAvLyBjYW52YXMgaXMgbm90IHN1cHBvcnRlZFxuICAgIGlmICghY2FudmFzLmdldENvbnRleHQpIHtcbiAgICAgICAgY2IobmV3IEVycm9yKCdDYW52YXNJc05vdFN1cHBvcnRlZCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpbWcuc3JjID0gdXJsO1xuICAgIH1cbn07XG4iXX0=
