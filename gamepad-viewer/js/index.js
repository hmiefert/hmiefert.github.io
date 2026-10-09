let loopStarted = false;

window.addEventListener("gamepadconnected", (evt) => {
  if (evt.gamepad.id.indexOf("Wireless Controller") !== -1) {
    console.log(`Gamepad connected: ${evt.gamepad.id}`);
    addGamepad();
  }  
});
window.addEventListener("gamepaddisconnected", (evt) => {
  console.log(`Gamepad disconnected: ${evt.gamepad.id}`);
});

function clearCanvas() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  ctx.reset();
}

function addGamepad() {
  if (!loopStarted) {
    requestAnimationFrame(updateStatus);
    loopStarted = true;
  }
}

function updateStatus() {
  for (const gamepad of navigator.getGamepads()) {

    if (!gamepad) continue;
    if (gamepad.id.indexOf("Wireless Controller") === -1) continue;

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.reset();

    ctx.font = "15px Arial";
    ctx.fillStyle = "white";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    
    ctx.beginPath();
    ctx.arc(50, 50, 40, 0, 2 * Math.PI);
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(200, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();

    let collective = 0
    let yaw = 0
    let pitch = 0
    let roll = 0

    for (const [i, axis] of gamepad.axes.entries()) {
      switch (i) {
        case 0:
          yaw = axis.toFixed(2);
        case 1:
          collective = axis.toFixed(2);
        case 2:
          roll = axis.toFixed(2);
        case 3:
          pitch = axis.toFixed(2);
      }
    }
    // left stick
    ctx.beginPath()
    ctx.arc(50 + 30 * yaw, 50 + 30 * collective, 2, 0, 2 * Math.PI);
    ctx.stroke();
    
    // right stick
    ctx.beginPath()
    ctx.arc(200 + 30 * roll, 50 + 30 * pitch, 2, 0, 2 * Math.PI);
    ctx.stroke();

    // Yaw
    if (yaw > -0.05 && yaw < 0.05) {
      ctx.fillText("0",42,115);
      ctx.fillText("YAW",35,130);
      ctx.fillText("↔",40,145);
    } else if (yaw <= -0.05) {
      ctx.fillText(`${Math.round(Math.abs(yaw * 100))-1}`,42,115);
      ctx.fillText("YAW",35,130);
      ctx.fillText("←",40,145);
    } else {
      ctx.fillText(`${Math.round(Math.abs(yaw * 100))-1}`,42,115);
      ctx.fillText("YAW",35,130);
      ctx.fillText("→",40,145);
    }

    // Collective
    if (collective > -0.05 && collective < 0.05) {
      ctx.fillText("0",110,40);
      ctx.fillText("COL",100,55);
      ctx.fillText("↕",110,70);
    } else if (collective <= -0.05) {
      ctx.fillText(`${Math.round(Math.abs(collective * 100))-1}`,110,40);
      ctx.fillText("COL",100,55);
      ctx.fillText("↑",110,70);
    } else {
      ctx.fillText(`${Math.round(Math.abs(collective * 100))-1}`,110,40);
      ctx.fillText("COL",100,55);
      ctx.fillText("↓",110,70);
    }

    // Roll
    if (roll > -0.05 && roll < 0.05) {
      ctx.fillText("0",192,115);
      ctx.fillText("RLL",185,130);
      ctx.fillText("↔",190,145);
    } else if (yaw <= -0.05) {
      ctx.fillText(`${Math.round(Math.abs(roll * 100))-1}`,192,115);
      ctx.fillText("RLL",185,130);
      ctx.fillText("←",190,145);
    } else {
      ctx.fillText(`${Math.round(Math.abs(roll * 100))-1}`,192,115);
      ctx.fillText("RLL",185,130);
      ctx.fillText("→",190,145);
    }

    // Pitch
    if (pitch > -0.05 && pitch < 0.05) {
      ctx.fillText("0",260,40);
      ctx.fillText("PTC",250,55);
      ctx.fillText("↕",260,70);
    } else if (pitch <= -0.05) {
      ctx.fillText(`${Math.round(Math.abs(pitch * 100))-1}`,260,40);
      ctx.fillText("PTC",250,55);
      ctx.fillText("↓",260,70);
    } else {
      ctx.fillText(`${Math.round(Math.abs(pitch * 100))-1}`,260,40);
      ctx.fillText("PTC",250,55);
      ctx.fillText("↑",260,70);
    }
  }

  requestAnimationFrame(updateStatus);
}