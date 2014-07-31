// Generated by CoffeeScript 1.7.1
var c, callback, footMatrix, hubo, makeSlider, progress, sign, code, filename
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

footMatrix = null;

$('#controls').tabs();

c = new WebGLRobots.DefaultCanvas("#hubo_container");

hubo = new Hubo('hubo2', callback = function() {
  c.add(hubo);
  $('#load').hide();
  $(".joint").each(function() {
    var id;
    id = $(this).attr("data-name");
    makeSlider(id);
    return $("[data-name=" + id + "] .joint_txt").html(hubo.motors[id].value.toFixed(2));
  });
  return $('#footanchor').on('change', function(event) {
    console.log(event);
    if (this.checked) {
      footMatrix = new THREE.Matrix4;
      return footMatrix.copy(hubo.links.Body_LAR.matrixWorld);
    } else {
      return footMatrix = null;
    }
  });
}, progress = function(step, total, node) {
  return $('#load').html("Loading " + step + "/" + total);
});

makeSlider = function(id) {
  var neck_joints, s;
  s = $("[data-name=" + id + "] .joint_slider");
  s.slider({
    min: parseFloat(hubo.motors[id].lower_limit),
    max: parseFloat(hubo.motors[id].upper_limit),
    step: 0.01,
    value: hubo.motors[id].value
  });
  s.on("slide", function(event, ui) {
    $("[data-name=" + id + "] .joint_txt").html(ui.value.toFixed(2));
    code = "robot.setProperties(\"" + hubo.motors[id].name + "\" , \"position\" , \"" + hubo.motors[id].value.toFixed(3) + "\")";
    document.getElementById("pythontext").innerHTML = code;
  });
  s.on("slide", function(event, ui) {
    var a, b;
    console.log("motors " + hubo.motors[id].name);
    hubo.motors[id].value = ui.value;
    console.log("ui " + ui.value);
    if (footMatrix != null) {
      console.log("Fix foot");
      a = new THREE.Matrix4;
      a.getInverse(hubo.links.Body_LAR.matrixWorld);
      b = new THREE.Matrix4;
      b.multiplyMatrices(a, footMatrix);
      return hubo.links.Body_Torso.applyMatrix(b);
    }
  });
  neck_joints = ['NK1', 'NK2', 'HNP', 'HNR'];
  if ((__indexOf.call(neck_joints, id) >= 0)) {
    return s.on("slide", function(event, ui) {
      var other_joint, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = neck_joints.length; _i < _len; _i++) {
        other_joint = neck_joints[_i];
        if (id !== other_joint) {
          $("[data-name=" + other_joint + "] .joint_slider").slider('value', hubo.motors[other_joint].value);
          _results.push($("[data-name=" + other_joint + "] .joint_txt").html(hubo.motors[other_joint].value.toFixed(2)));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  }
};

sign = function(x) {
  if (x) {
    if (x < 0) {
      return -1;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
};

/* FileSaver.js demo script
 * 2012-01-23
 * 
 * By Eli Grey, http://eligrey.com
 * License: X11/MIT
 *   See LICENSE.md
 */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */
/*
(function(view) {
"use strict";
// The canvas drawing portion of the demo is based off the demo at
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
var
    document = view.document
  , $ = function(id) {
    return document.getElementById(id);
  }
  , session = view.sessionStorage
  // only get URL when necessary in case Blob.js hasn't defined it yet
  , get_blob = function() {
    return view.Blob;
  }

  , text = $("text")
  , save_options_form = $("save-options")
  , text_filename = $("text-filename")

  // Title guesser and document creator available at https://gist.github.com/1059648
  , guess_title = function(doc) {
    var
        h = "h6 h5 h4 h3 h2 h1".split(" ")
      , i = h.length
      , headers
      , header_text
    ;
    while (i--) {
      headers = doc.getElementsByTagName(h[i]);
      for (var j = 0, len = headers.length; j < len; j++) {
        header_text = headers[j].textContent.trim();
        if (header_text) {
          return header_text;
        }
      }
    }
  }
  , doc_impl = document.implementation
  , create_html_doc = function(html) {
    var
        dt = doc_impl.createDocumentType('html', null, null)
      , doc = doc_impl.createDocument("http://www.w3.org/1999/xhtml", "html", dt)
      , doc_el = doc.documentElement
      , head = doc_el.appendChild(doc.createElement("head"))
      , charset_meta = head.appendChild(doc.createElement("meta"))
      , title = head.appendChild(doc.createElement("title"))
      , body = doc_el.appendChild(doc.createElement("body"))
      , i = 0
      , len = html.childNodes.length
    ;
    charset_meta.setAttribute("charset", html.ownerDocument.characterSet);
    for (; i < len; i++) {
      body.appendChild(doc.importNode(html.childNodes.item(i), true));
    }
    var title_text = guess_title(doc);
    if (title_text) {
      title.appendChild(doc.createTextNode(title_text));
    }
    return doc;
  }
;


save_options_form.addEventListener("submit", function(event) {
  event.preventDefault();
  var BB = get_blob();
  saveAs(
      new BB(
        [text.value || text.placeholder]
      //, {type: "text/plain;charset=" + document.characterSet}
    )
    , (text_filename.value || text_filename.placeholder) + ".py"
  );
}, false);


view.addEventListener("unload", function() {
  session.x_points = JSON.stringify(x_points);
  session.y_points = JSON.stringify(y_points);
  session.drag_points = JSON.stringify(drag_points);
  session.canvas_filename = canvas_filename.value;
  
  session.text = text.value;
  session.text_filename = text_filename.value;
  
  session.html = html.innerHTML;
  session.html_filename = html_filename.value;
}, false);
}(self));*/

addToScript = function() {
  var elem = document.getElementById("script");
  if(code !== undefined) {
    elem.value += "\t"+ code + "\n";
  }
};

get_blob = function() {
    return view.Blob;
}

document.onload = function(){ var save_options_form = document.getElementById("save-options"); };

save_options_form.addEventListener("submit", function(event) {
  var text = document.getElementById("text");
  var text_filename = document.getElementById("text-filename");
  event.preventDefault();
  var BB = get_blob();
  saveAs(
      new BB(
        [text.value || text.placeholder]
      , {type: "text/plain;charset=" + document.characterSet}
    )
    , (text_filename.value || text_filename.placeholder) + ".py"
  );
}, false);

