#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

#define buzzer D1
#define boton D2
#define gasSensor A0
#define tempSensor D4
#define DHTTYPE DHT11
#define ledWiFi D3

DHT dht(tempSensor, DHTTYPE);


#define WIFI_SSID "Tec-IoT"           // Tec-IoT
#define WIFI_PASSWORD "REDACTED"       // REDACTED"

HTTPClient httpClient;
WiFiClient wClient;

String URLinsertLectura = "http://REDACTED:3000/iot/api/insertLectura";
String URLgetLastLectura = "http://REDACTED:3000/iot/api/getLastLectura";
String URLinsertAlerta = "http://REDACTED:3000/iot/api/insertAlerta";
String KEY = "REDACTED";


const int umbralGas = 500;
const int umbralTemp = 40;
int countTemp = 0;
int countGas = 0;

int const idSensorTemp = 1;
int const idSensorGas = 2;

void setup() {
    // Buzzer
    pinMode(buzzer, OUTPUT);
    digitalWrite(buzzer, LOW);

    // Boton
    pinMode(boton, INPUT_PULLUP);

    // Sensores
    pinMode(gasSensor, INPUT);
    pinMode(tempSensor, INPUT);

    // LED
    pinMode(ledWiFi, OUTPUT);
    digitalWrite(ledWiFi, LOW);
    
    // Sensor de temperatura
    dht.begin();


    Serial.begin(9600);


    // ---- Conexión WiFi ----
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Conectando a red WiFi \"");
    Serial.print(WIFI_SSID);
    Serial.print("\"");
    while (WiFi.status() != WL_CONNECTED) {
        digitalWrite(ledWiFi, HIGH);
        delay(250);
        Serial.print(".");
        digitalWrite(ledWiFi, LOW);
        delay(250);
    }
    Serial.print("\nConectado! IP: ");
    digitalWrite(ledWiFi, HIGH);
    Serial.println(WiFi.localIP());

    Serial.println("Iniciando...");
    delay(3000);
    digitalWrite(D0, LOW);
}

void loop() {
    float temp = dht.readTemperature();
    int gasVal = analogRead(gasSensor);

    if (temp > umbralTemp) {
      Serial.println("Temperatura alta!");
      buzzerloop();
      lecturaIntentoPOSinsert(idSensorTemp, temp);
      insertAlerta(idSensorTemp);
      countTemp = 0;
    }

    if (gasVal > umbralGas) {
      Serial.println("Gas detectado!");
      buzzerloop();
      lecturaIntentoPOSinsert(idSensorGas, gasVal);
      insertAlerta(idSensorGas);
      countGas = 0;
    }
            
    if (countTemp == 300) {
        Serial.print("Temperatura: ");
        Serial.print(temp);
        Serial.println(" C");
        lecturaIntentoPOSinsert(idSensorTemp, temp);
        countTemp = 0;
    }

    if (countGas == 120) {
        Serial.print("Gas sensor value: ");
        Serial.println(gasVal);
        lecturaIntentoPOSinsert(idSensorGas, gasVal);
        countGas = 0;
    }
    
    countGas += 1;   countTemp += 1;
    delay(1000);   
}

void buzzerloop() {
    while (true) {
        digitalWrite(buzzer, HIGH);
        delay(1);
        digitalWrite(buzzer, LOW);
        delay(1);
        if (analogRead(boton) == LOW) {
            Serial.println("Boton presionado...");
            break;
        }
    }
    delay(4000);
}

void insertAlerta(int sensor) {
    int idLectura = IntentogetLastLectura(sensor);
    alertaIntentoPOSinsert(idLectura); 
}

int extraerIdLectura(String json) {
  int idx = json.indexOf("\"id_lectura\":");
  if (idx < 0) {
    return -1; // no encontrado
  }

  // Ir al carácter después de los dos puntos :
  idx = json.indexOf(":", idx);
  if (idx < 0) {
    return -1;
  }
  idx++; // nos movemos después de ':'

  // Saltar espacios
  while (idx < (int)json.length() && (json[idx] == ' ' || json[idx] == '\"')) {
    idx++;
  }

  // Construir el número
  String numStr = "";
  while (idx < (int)json.length() && isDigit(json[idx])) {
    numStr += json[idx];
    idx++;
  }

  if (numStr.length() == 0) {
    return -1;
  }

  return numStr.toInt();
}

int IntentogetLastLectura(int sensor_id){
  String URL = URLgetLastLectura;
  
  String serverResponse = "";   // Respuesta cruda del servidor

  Serial.println("URL: " + URL);

  if (WiFi.status() == WL_CONNECTED) {

    httpClient.begin(wClient, URL);
    httpClient.addHeader("Content-Type", "application/json");
    httpClient.addHeader("x-api-key", KEY);

    // JSON que envías en el POST
    String jsonBody = "{ \"id_sensor\": " + String(sensor_id) + " }";
    Serial.println("Enviando JSON: " + jsonBody);

    // Enviar POST
    int httpResponseCode = httpClient.POST(jsonBody);
    Serial.println("Código HTTP: " + String(httpResponseCode));

    // Si hubo respuesta del servidor
    if (httpResponseCode > 0) {
      serverResponse = httpClient.getString();   // Guardamos la respuesta
      Serial.println("Respuesta del servidor:");
      Serial.println(serverResponse);
    } else {
      Serial.println("Error en la petición POST");
    }

    httpClient.end();
  }

  int idLectura = extraerIdLectura(serverResponse);
  Serial.print("id_lectura extraído: ");
  Serial.println(idLectura);

  return idLectura;   // <-- ahora regresamos el entero
}

void lecturaIntentoPOSinsert(int sensor, float data){
  String URL = URLinsertLectura;
  if (WiFi.status() == WL_CONNECTED) {

    // Construimos el JSON que la API espera: { "valor": 25.8 }
    String jsonBody = "{\"id_sensor\":" + String(sensor) + ",\"valor\":" + String(data) + "}";

    Serial.print("POST a: ");
    Serial.println(URL);
    Serial.print("Body: ");
    Serial.println(jsonBody);

    httpClient.begin(wClient, URL); 
    httpClient.addHeader("Content-Type", "application/json");
    httpClient.addHeader("x-api-key", KEY);

    int httpResponseCode = httpClient.POST(jsonBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode); 

    if (httpResponseCode > 0) {
      Serial.println(httpClient.getString());
    }

    httpClient.end(); 
  }
  else {
    Serial.println("WiFi Desconectado");
  }
}

void alertaIntentoPOSinsert(int id_lectura){
  String URL = URLinsertAlerta;
  if (WiFi.status() == WL_CONNECTED) {

    // Construimos el JSON que la API espera: { "valor": 25.8 }
    String jsonBody = "{\"id_lectura\":" + String(id_lectura) + "}";

    Serial.print("POST a: ");
    Serial.println(URL);
    Serial.print("Body: ");
    Serial.println(jsonBody);

    httpClient.begin(wClient, URL); 
    httpClient.addHeader("Content-Type", "application/json");
    httpClient.addHeader("x-api-key", KEY);

    int httpResponseCode = httpClient.POST(jsonBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode); 

    if (httpResponseCode > 0) {
      Serial.println(httpClient.getString());
    }

    httpClient.end(); 
  }
  else {
    Serial.println("WiFi Desconectado");
  }
}
