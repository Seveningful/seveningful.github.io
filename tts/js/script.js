/* TOOLS */
// SOURCE : http://stackoverflow.com/questions/30355241/get-the-length-of-a-svg-line-rect-polygon-and-circle-tags

var tools = {


    /**
     *
     * Used to get the length of a rect
     *
     * @param el is the rect element ex $('.rect')
     * @return the length of the rect in px
     */
    getRectLength: function (el) {
        var w = el.getAttribute('width');
        var h = el.getAttribute('height');

        return (w * 2) + (h * 2);
    },

    /**
     *
     * Used to get the length of a Polygon
     *
     * @param el is the Polygon element ex $('.polygon')
     * @return the length of the Polygon in px
     */
    getPolygonLength: function (el) {
        var points = el.getAttribute('points');
        points = points.split(' ');
        if (points.length > 1) {
            function coord(c_str) {
                var c = c_str.split(',');
                if (c.length != 2) {
                    return; // return undefined
                }
                if (isNaN(c[0]) || isNaN(c[1])) {
                    return;
                }
                return [parseFloat(c[0]), parseFloat(c[1])];
            }

            function dist(c1, c2) {
                if (c1 != undefined && c2 != undefined) {
                    return Math.sqrt(Math.pow((c2[0] - c1[0]), 2) + Math.pow((c2[1] - c1[1]), 2));
                } else {
                    return 0;
                }
            }

            var len = 0;
            // measure polygon
            if (points.length > 2) {
                for (var i = 0; i < points.length - 1; i++) {
                    len += dist(coord(points[i]), coord(points[i + 1]));
                }
            }
            // measure line or measure polygon close line
            len += dist(coord(points[0]), coord(points[points.length - 1]));
            return len;
        } else {
            return 0;
        }
    },

    /**
     *
     * Used to get the length of a line
     *
     * @param el is the line element ex $('.line')
     * @return the length of the line in px
     */
    getLineLength: function (el) {
        var x1 = el.getAttribute('x1');
        var x2 = el.getAttribute('x2');
        var y1 = el.getAttribute('y1');
        var y2 = el.getAttribute('y2');
        var lineLength = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        return lineLength;

    },

    /**
     *
     * Used to get the length of a circle
     *
     * @param el is the circle element
     * @return the length of the circle in px
     */
    getCircleLength: function (el) {
        var r = el.getAttribute('r');
        var circleLength = 2 * Math.PI * r;
        return circleLength;
    },


    /**
     *
     * Used to get the length of the path
     *
     * @param el is the path element
     * @return the length of the path in px
     */
    getPathLength: function (el) {
        var pathCoords = el.get(0);
        var pathLength = pathCoords.getTotalLength();
        return pathLength;
    }
}
/* TOOLS END*/


/* Shattered Head */

 logo.addEventListener("load",function() {
     animateLogo();
 }, false);


function animateLogo() {
    var node = logo.getBoundingClientRect();
    var svgDoc = logo.contentDocument;


    var allGs = svgDoc.getElementsByTagName('g');
    var delay = 1;
    for (var i = 0; i < allGs.length; i++) {

        var gElem = allGs[i];
        var children = gElem.children;

        for (var j = 0; j < children.length; j++) {

            var child = children[j];
            length = child.tagName != "path" ? tools.getPolygonLength(child) : child.getTotalLength();
            length = length * 1.4;
            child.style.fill = "transparent";
            child.setAttribute("stroke", "white")
            child.setAttribute("stroke-width", "2")
            child.setAttribute("stroke-dashoffset", "" + length)
            child.setAttribute("stroke-dasharray", "" + length + " " + length)

            TweenMax.to(child, 1, {
                delay: 1 * delay,
                attr: {
                    "stroke-dashoffset": "0"
                },
                onComplete: setWhite,
                onCompleteParams: [child],
                ease: Power2.easeOut
            });
            delay += 0.08;
        }
    }

}

function setWhite(child) {
    TweenMax.to(child, 0.2, {
        fill: "white"
    });
}