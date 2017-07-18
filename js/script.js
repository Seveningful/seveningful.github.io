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


var pma = document.getElementById("page-me-btn");
var pms = document.getElementById("page-shop-btn");
var pmh = document.getElementById("page-home-btn");
var pmm = document.getElementById("page-music-btn");

var movingBackground = true;

var mouse = {
    x: 0,
    y: 0
};
var yo2, yo3, yo4;
document.onmousemove = function (e) {

    mouse.x = e.clientX || e.pageX;
    mouse.y = e.clientY || e.pageY;

    yo2 = (((mouse.x) - (screen.width / 2)) / 800);
    yo3 = 1 + (yo2 / 100)
    if (yo2 < 0) {
        yo3 = 1 - (yo2 / 100)
    }
    yo4 = (((mouse.y) - (screen.height / 2)) / 1000);
    if (movingBackground)
        applyImage();


    applyLogo();

}

function applyImage() {

    image.style.WebkitTransform = "scale(1.2)  matrix3d(1,0,0.00," + yo2 / 9000 + ",0.00,1,0.00," + yo4 / 6000 + ",0,0,1,0,0,0,0,1)";
    image.style.transform = "scale(1.2)  matrix3d(1,0,0.00," + yo2 / 9000 + ",0.00,1,0.00," + yo4 / 6000 + ",0,0,1,0,0,0,0,1)";
}

function applyLogo() {
    logo.style.WebkitTransform = " matrix3d(1,0,0.00," + yo2 / (movingBackground ? 4000 : 2000) + ",0.00,1,0.00," + yo4 / (movingBackground ? 2000 : 1000) + ",0,0,1,0,0,0,0,1)";
    logo.style.transform = " matrix3d(1,0,0.00," + yo2 / (movingBackground ? 4000 : 2000) + ",0.00,1,0.00," + yo4 / (movingBackground ? 2000 : 1000) + ",0,0,1,0,0,0,0,1)";
}


TweenMax.to(".blackfilter", 0.5, {
    opacity: 0.6
});
TweenMax.to(logo, 0.5, {
    opacity: 1
});
TweenMax.to("#page-music-btn", 0.5, {
    opacity: 1,
    delay: 3
});
TweenMax.to("#page-shop-btn", 0.5, {
    opacity: 1,
    delay: 3
});
TweenMax.to("#page-home-btn", 0.5, {
    opacity: 1,
    delay: 3.5
});
TweenMax.to("#page-me-btn", 0.5, {
    opacity: 1,
    delay: 3.5
});

/* ------------------ Functions ------------------ */

/* 
 * Place white div to show page content.
 * Move menu to the top of the page
 * Disable background mouse interaction 
 *
 */
function setupPage(bool) {

    this.movingBackground = true;
    TweenMax.to(menu, 1, {
        top: "70px",
        ease: Power1.easeInOut
    });

    TweenMax.to(logo, 1, {
        width: "100px"
    });

    TweenMax.to(mainblock, 1, {
        top: "140px"
    });
}

function setupMe() {
    TweenMax.to(merchBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });

    TweenMax.to(shatterContainer, 1, {
        opacity: 1,
        top: "40%",
        ease: Power2.easeInOut
    });

    TweenMax.to(meBlock, 1, {
        opacity: 1,
        marginTop: "0%",
        ease: Power2.easeInOut
    });

    TweenMax.to(musicBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });
}

function setupMusic() {
    TweenMax.to(merchBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });

    TweenMax.to(shatterContainer, 1, {
        opacity: 1,
        top: "40%",
        ease: Power2.easeInOut
    });

    TweenMax.to(musicBlock, 1, {
        opacity: 1,
        marginTop: "0%",
        ease: Power2.easeInOut
    });

    TweenMax.to(meBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });
}

function setupMerch() {

    TweenMax.to(merchBlock, 1, {
        opacity: 1,
        marginTop: "0%",
        ease: Power2.easeInOut
    });
    TweenMax.to(shatterContainer, 1, {
        opacity: 0,
        top: "100%",
        ease: Power2.easeInOut
    });
    TweenMax.to(musicBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });

    TweenMax.to(meBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });
}

/* 
 * Resets page to home page
 *
 */
function setupHome() {

    this.movingBackground = true;
    TweenMax.to(menu, 1, {
        top: "50%",
        ease: Power1.easeInOut
    });

    TweenMax.to(logo, 1, {
        width: "100%",
        ease: Power2.easeInOut
    });

    TweenMax.to(mainblock, 1, {
        top: "100%"
    });
    TweenMax.to(merchBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });
    TweenMax.to(shatterContainer, 1, {
        opacity: 0,
        top: "100%",
        ease: Power2.easeInOut
    });
    TweenMax.to(musicBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });

    TweenMax.to(meBlock, 1, {
        opacity: 0,
        marginTop: "100%",
        ease: Power2.easeInOut
    });
}


/* --------------------- END --------------------- */


/* Music button */
pmm.onclick = function () {
    setupPage();
    setupMusic();

}

/* Me? button */
pma.onclick = function () {
    setupPage();
    setupMe();
}

/* Shop button */
pms.onclick = function () {
    setupPage(false);
    setupMerch();
}

/* Home button */
pmh.onclick = function () {
    setupHome();
}



/* Shattered Head */
 
animateLogo();

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

            TweenMax.to(child, 1.7, {
                delay: 1 * delay,
                attr: {
                    "stroke-dashoffset": "0"
                },
                onComplete: setWhite,
                onCompleteParams: [child],
                ease: Power2.easeInOut
            });
            delay += 0.1;
        }
    }

}

function setWhite(child) {
    TweenMax.to(child, 1, {
        fill: "white"
    });
}

function shatterHead(intensity) {
    var node = shatter.getBoundingClientRect();
    var svgDoc = shatter.contentDocument;
    var y1 =  ((node.bottom - node.top) / 2) , //((node.bottom - node.top) / 2),
        x1 = ((node.right - node.left) / 2) ; //((node.right - node.left) / 2); // node.right - node.left;

    var allGs = svgDoc.getElementsByTagName('g');

    for (var i = 0; i < allGs.length; i++) {

        var gElem = allGs[i];
        var children = gElem.children;
        gElem.setAttribute("style", " -webkit-transform: scale(0.5);    -webkit-transform-origin: 50% 50%;    -moz-transform: scale(0.5);    -moz-transform-origin: 50% 50%;    -o-transform: scale(0.5);    -o-transform-origin: 50% 50%;    -ms-transform: scale(0.5);    -ms-transform-origin: 50% 50%;    transform: scale(0.5);    transform-origin: 50% 50%;")

        for (var j = 0; j < children.length; j++) {

            var child = children[j];

            if (!displaceChild(child, x1, y1, intensity)) continue;

        }
    }
    var path = svgDoc.getElementsByTagName('path')[4];
    displaceChild(path, x1, y1, intensity);

}

function displaceChild(obj, x1, y1, intensity) {
    if (typeof intensity == 'undefined') intensity = 0;
    var node2 = obj.getBoundingClientRect();
    var y2 = node2.top + ((node2.bottom - node2.top) / 2),
        x2 = node2.left + ((node2.right - node2.left) / 2);
    var x3 = x2 - x1;
    var y3 = y2 - y1;

    var hyp = Math.sqrt(Math.pow(x3, 2) + Math.pow(y3, 2));
    intensity = (intensity - (255 - hyp) / 2);
    intensity = intensity < 0 ? 0 : intensity;
    var angle = Math.atan(y3 / x3) * 180 / Math.PI;
    var q = 0;
    if (x2 > x1 && y2 > y1) {
        angle = 180 - angle;

    } else if (x2 < x1 && y2 > y1) {
        angle = -angle;
        q = 2;

    } else if (x2 < x1 && y2 < y1) {
        angle = 360 - angle;

    } else if (x2 > x1 && y2 < y1) {
        angle = 180 - angle;

    }
    angle = angle * Math.PI / 180;

    TweenMax.to(obj, 0.0, {
        x: Math.cos(angle) * -intensity, //(Math.pow(hyp/10 ,2)),
        y: Math.sin(angle) * intensity //(Math.pow(hyp/10 ,1.3)) 
    });
}

function unshatter() {
    var svgDoc = shatter.contentDocument;

    var node = menu.getBoundingClientRect();

    var allGs = svgDoc.getElementsByTagName('g');

    for (var i = 0; i < allGs.length; i++) {
        var gElem = allGs[i];
        var children = gElem.children;

        for (var j = 0; j < children.length; j++) {
            var child = children[j];
            var node2 = child.getBoundingClientRect();

            TweenMax.to(child, 0.5, {
                x: 0,
                y: 0
            });

        }
    }

}

/* Shattered Head END */


/* Controls */
playBtn.onclick = function () {
    if (myAudio.paused) {
        play();
        playBtn.className = "fa fa-play activeBtn";
    } else {
        setPaused();
        playBtn.className = "fa fa-play";
    }
}

randomBtn.onclick = function () {
    if (setRandom()) {
        randomBtn.className = "fa fa-random activeBtn";
    } else {
        randomBtn.className = "fa fa-random";
    }

}
/* Controls END */
