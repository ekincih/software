import processing.serial.*;

Serial arduino;

int[] targets = new int[5];

void setup() {
  size(400, 200);
  println(Serial.list());
  // adjust index to match your Arduino port
  arduino = new Serial(this, Serial.list()[0], 9600);
  for (int i = 0; i < 5; i++) targets[i] = 0;
}

void draw() {
  background(240);
  for (int i = 0; i < 5; i++) {
    int x = 50 + i * 60;
    int y = height/2;
    fill(200);
    rect(x, y-40, 40, 80);
    fill(100);
    int pos = map(targets[i], -100, 100, y+30, y-30);
    rect(x+10, pos, 20, y-pos);
    fill(0);
    text("M"+i, x+10, y+50);
  }
}

void keyPressed() {
  int motor = key - '0';
  if (motor >= 0 && motor < 5) {
    targets[motor] += 10;
    sendCommand(motor, 1, 100); // move 100 steps forward
  }
  if (key == 'r') {
    // reset all motors
    for (int i = 0; i < 5; i++) {
      sendCommand(i, 0, 0);
    }
  }
}

void sendCommand(int m, int d, int s) {
  arduino.write(str(m));
  arduino.write(str(d));
  arduino.write(str(s) + "\n");
}
