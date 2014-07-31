# Create a THREE.WebGLRenderer() to host the robot. You can create your own, or use the provided code to generate default setup.
c = new WebGLRobots.DefaultCanvas('#hubo_container')
# Create a new robot instance.
window.hubo = new Hubo 'hubo2'
  , callback = () ->
    # Once the URDF is completely loaded, this function is run.
    # Add your robot to the canvas.
    c.add(hubo)
    $('#load').hide()
  , progress = (step,total,node) ->
    $('#load').html("Loading " + step + "/" + total)

$('#mouse_info_dialog').dialog
  autoOpen: false
  closeOnEscape: true
  buttons: 
    OK: () -> 
      $(this).dialog('close')

$('#mouse_info_button').on 'click', () ->
    $('#mouse_info_dialog').dialog('open')