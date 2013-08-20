// Generated by CoffeeScript 1.6.3
var c, callback, hubo, makeSlider, progress, sign;

c = new WebGLRobots.DefaultCanvas("#hubo_container");

hubo = new Hubo('hubo2', callback = function() {
  c.add(hubo);
  $('#load').hide();
  return $(".joint").each(function() {
    var id;
    id = $(this).attr("data-name");
    makeSlider(id);
    return $("[data-name=" + id + "] .joint_txt").html(hubo.joints[id].value.toFixed(2));
  });
}, progress = function(step, total, node) {
  return $('#load').html("Loading " + step + "/" + total);
});

makeSlider = function(id) {
  var s;
  s = $("[data-name=" + id + "] .joint_slider");
  s.slider({
    min: parseFloat(hubo.joints[id].lower_limit),
    max: parseFloat(hubo.joints[id].upper_limit),
    step: 0.01,
    value: hubo.joints[id].value
  });
  s.on("slide", function(event, ui) {
    return $("[data-name=" + id + "] .joint_txt").html(ui.value.toFixed(2));
  });
  return s.on("slide", function(event, ui) {
    return hubo.joints[id].value = ui.value;
  });
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
