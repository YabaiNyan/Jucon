#include "Keyboard.h"
char onoff = '=';

void setup() {
  // open the serial port:
  Serial.begin(256000);
  // initialize control over the keyboard:
  Keyboard.begin();
}

void loop() {
  // check for incoming serial data:
  if (Serial.available() > 0) {
    char inkey = Serial.read();
    if(inkey == '<' || inkey == '>'){
      onoff = inkey;
    }else if(onoff != '-'){
      if(onoff == '<'){
        Keyboard.press(inkey);
      }else{
        Keyboard.release(inkey);
      }
      onoff = '-';
    }
  }
}
