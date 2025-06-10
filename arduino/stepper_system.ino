#include <AccelStepper.h>
#include <LiquidCrystal.h>

// Stepper motor pins (example for A4988 or similar drivers)
const int stepPins[5] = {2, 4, 6, 8, 10};
const int dirPins[5]  = {3, 5, 7, 9, 11};

AccelStepper steppers[5] = {
  AccelStepper(AccelStepper::DRIVER, stepPins[0], dirPins[0]),
  AccelStepper(AccelStepper::DRIVER, stepPins[1], dirPins[1]),
  AccelStepper(AccelStepper::DRIVER, stepPins[2], dirPins[2]),
  AccelStepper(AccelStepper::DRIVER, stepPins[3], dirPins[3]),
  AccelStepper(AccelStepper::DRIVER, stepPins[4], dirPins[4])
};

// Limit switch pins for homing
const int limitPins[5] = {22, 23, 24, 25, 26};

// Example additional sensors
const int sensorA = A0;
const int sensorB = A1;

// LCD using pins from sensor shield
LiquidCrystal lcd(12, 13, 30, 31, 32, 33);

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 5; i++) {
    steppers[i].setMaxSpeed(1000);
    steppers[i].setAcceleration(200);
    pinMode(limitPins[i], INPUT_PULLUP);
  }
  pinMode(sensorA, INPUT);
  pinMode(sensorB, INPUT);
  lcd.begin(16, 2);
  lcd.print("Stepper Ready");
}

void loop() {
  // Example: simple serial protocol
  if (Serial.available()) {
    int motor = Serial.read() - '0'; // motor index 0-4
    int dir = Serial.read() - '0';   // direction 0 or 1
    long steps = Serial.parseInt();
    if (motor >= 0 && motor < 5) {
      steppers[motor].move((dir ? 1 : -1) * steps);
    }
  }

  // Run steppers and check limits
  for (int i = 0; i < 5; i++) {
    if (digitalRead(limitPins[i]) == LOW) {
      steppers[i].stop();
      steppers[i].setCurrentPosition(0); // home position
    }
    steppers[i].run();
  }

  // Read sensors and display
  lcd.setCursor(0, 1);
  int valueA = analogRead(sensorA);
  lcd.print("A:");
  lcd.print(valueA);
  lcd.print(" ");
  int valueB = analogRead(sensorB);
  lcd.print("B:");
  lcd.print(valueB);
  delay(50);
}
