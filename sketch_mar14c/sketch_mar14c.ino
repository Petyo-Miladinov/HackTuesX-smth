#include <SPI.h>
#include <Ethernet.h>  
#include <WiFiNINA.h>

// #include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = "A1_953F";        // your network SSID (name)
char pass[] = "46515513";    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

uint8_t flag = 1;

int status = WL_IDLE_STATUS;

char server[] = "192.168.217.42";    // name address for Google (using DNS)

uint32_t rotation = 1;
uint32_t heigth = 0;

char data[64] = {0};

WiFiClient client;

void getReading(void){
  float sum = 0;
  for (int i = 0; i < 100; i++) {
    sum += 13*pow(analogRead(A0)*0.0048828125, -1);
  }

  if(sum == 0){
    sum = 1;
  }
  
  float z = heigth * 0.36;
  float x = (cos((rotation*3.6)*(3.141592 / 180.0)) * (15-(sum / 1000)));
  float y = (sin((rotation*3.6)*(3.141592 / 180.0)) * (15-(sum / 1000)));

  if(x >= 100)
    x = 0;
  if(y >= 100)
    y = 0;

  Serial.println("Data: ");
  Serial.println(x);
  Serial.println(y);
  Serial.println(z);

  sprintf(data, "%f,%f,%f", x, y, z);

  Serial.println(data);

  rotation++;
  for(int i = 0; i < 16; i++){
    digitalWrite(3, LOW);
    delay(1);
    digitalWrite(3, HIGH);
    delay(1);
  }
  // digitalWrite(3, LOW);
  // digitalWrite(3, HIGH);
  
  if(rotation > 100){
    heigth++;
    rotation = 1;
    if(heigth >= 800 || sum / 1000 >= 20){
      flag = 0;
    }
    for(int i = 0; i < 16; i++){
      digitalWrite(5, HIGH);
      delay(1);
      digitalWrite(5, LOW);
      delay(1);
    }
  }
  return;
}

// void setup1(){
//   Serial.begin(115200);
// }

// void loop1(){
//   Serial.println("Hewwo");
// }


void setup() {

  //Initialize serial and wait for port to open:

  Serial.begin(115200);

  // while (!Serial) {

  //   ; // wait for serial port to connect. Needed for native USB port only

  // }

  // setup sensor pin
  pinMode(A0, INPUT);

  // setup stepper pins
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, INPUT_PULLUP);

  digitalWrite(2, HIGH);
  digitalWrite(4, LOW);

  // check for the WiFi module:

  if (WiFi.status() == WL_NO_MODULE) {

    Serial.println("Communication with WiFi module failed!");

    // don't continue

    while (true);

  }

  String fv = WiFi.firmwareVersion();

  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {

    Serial.println("Please upgrade the firmware");

  }

  // attempt to connect to Wifi network:

  while (status != WL_CONNECTED) {

    Serial.print("Attempting to connect to SSID: ");

    Serial.println(ssid);

    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:

    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:

    delay(10000);

  }

  Serial.println("Connected to wifi");

  printWifiStatus();

  Serial.println("\nStarting connection to server...");

  // if you get a connection, report back via serial:

  if (client.connect(server, 80)) {

    Serial.println("connected to server");

    // get reading from sendor
    // char msg[64] = {0};

    // getReading(); 

    // sprintf(msg, "GET /test?data=%s HTTP/1.1", data);

    // Serial.println(msg);

    // Make a HTTP request:

    // client.println(msg);

    client.println("GET /new_file?data=NiggasInMyB-hole&id=123 HTTP/1.1");

    client.println("Host: 192.168.217.42");

    client.println("Connection: close");

    client.println();

    Serial.println("Waiting for bUtton!");

    while(digitalRead(6) != 0){
    }

  }
}

  // if (client.connect(server, 80)) {

  //   Serial.println("Connected to server and ready to send data");

  //   // Make a HTTP request:

  //   char msg[64] = {0};

  //   char* data = getReading(); 

  //   sprintf(msg, "GET /test?data=%f HTTP/1.1", data);

  //   client.println(msg);

  //   client.println("Host: 192.168.217.61");

  //   client.println("Connection: close");

  //   client.println();
  // }

void loop() {

  if(flag == 1){
    if (client.connect(server, 80)) {

      Serial.println("connected to server");

      // get reading from sendor
      char msg[64] = {0};

      getReading(); 

      sprintf(msg, "GET /add?data=%s&id=123 HTTP/1.1", data);

      Serial.println(msg);

      // Make a HTTP request:

      client.println(msg);

      // client.println("GET /test?data=NiggasInMyB-hole HTTP/1.1");

      client.println("Host: 192.168.217.42");

      // client.println("Connection: close");

      client.println();

    }
  }

  while (client.available()) {

    char c = client.read();

    Serial.write(c);

  }

  // if the server's disconnected, stop the client:

  // if (!client.connected()) {

  //   Serial.println();

  //   Serial.println("disconnecting from server.");

  //   client.stop();

  //   // do nothing forevermore:

  //   while (true);

  // }
}

void printWifiStatus() {

  // print the SSID of the network you're attached to:

  Serial.print("SSID: ");

  Serial.println(WiFi.SSID());

  // print your board's IP address:

  IPAddress ip = WiFi.localIP();

  Serial.print("IP Address: ");

  Serial.println(ip);

  // print the received signal strength:

  long rssi = WiFi.RSSI();

  Serial.print("signal strength (RSSI):");

  Serial.print(rssi);

  Serial.println(" dBm");
}