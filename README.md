# Robotik
Memos eines Programmierers der auszog um Roboter zu bauen

##erste Versuche 
Von einer reparierten elektrischen Zahnbürsteaußer war außer undokumentierter Elektronik nur noch der Motor übrig. 2 Kontakte ohne Markierung.  An eine 1,5V Batterie angeschlossen drehte er sich. Drehe drehe ich die Batterie, ändert sich die Laufrichtung. Soweit ist es plausibel.

## Analog Out Bricklet und Motoren

Ich habe seit kurzen Tingerforge Bausteine. [Das Analog Out](https://www.tinkerforge.com/de/shop/bricklets/analog-out-bricklet.html)  Bricklet hat 4 Kontakte. 5V, 3.3V, Vout, Grnd. Verbinde ich 3.3V und Ground läuft der Motor vorwärts. 5V und Grnd ist schneller vorwärts. Verbinde ich 5V mit 3.3V gehen die Lichter aus und das Bricklet ist kaputt.  Gut das es nur 3€ gekostet hat. 

Aber wie mappe ich + und - auf Strom und Ground? 
Und wie mache ich das der Motor in die andere Richtung dreht?s

Laut Erinnerung fließen die Elektronen von - zu +.  Der Akku hat ein gewisses Potential, das sich über den Motor versucht auszugleichen. Also nehme ich mal an das es -3.3V sind und Ground der Pluspol. Vielleicht irre ich mich auch.

Der Tinkerforge Analog Out Brick hat 4 Pins, 3.3V, 5V, Vout und Gnd. V-Out ist das steuerbare und damit interessante. Aber sind es nun + oder - 5V? Laut Doku sollten es +5V sein. Die LED von der Weihnachtsbaumbeleuchtung hing aber so am Kabel das es eher -5V sein sollten. 

### LEDs

LEDs geben in einem bestimmten Volt-Bereich Licht ab. Darunter haben sie einen hohen Widerstand und lassen kein Strom durch. Über dem Lieblingsbereich sinkt ihr Widerstand, sie werden sehr hell und gehen dann kaputt. In einer einfachen Schaltung werden LEDs mit Widerständen in Reihe geschaltet um die Maximalspanung zu begrenzen. Mit dem Analog Out Bricklet muss ich das nicht. Ich kann sagen wieviel Strom fließen soll. Wenn ich von 0 Anfange und mich langsam nähere, geht nichts kaputt. Schließe ich die LED falschrum an, ist sie nur ein Widerstand und es passiert nichts. Die weiße LED, die ich bei der Lichterkette abgeknipst habe, beginnt bei 2,4 V an zu leuchten und bei 3.2V ist sie sehr hell. Mehr habe ich nicht ausprobiert. Laut Aufdruck auf dem Batterieteil der Lichterkette sollte sie für 3V ausgelegt sein.

## Was macht der Servobrick?

Es gibt bei Tinkerforge einige Bricks, die für Motorsteuerungen in Frage kommen, aber was ist was?

Der [Stepperbrick](https://www.tinkerforge.com/de/shop/bricks/stepper-brick.html) Stepperbrick steuert 1 Schrittmotor und kostet 50€. Der [Servobrick](https://www.tinkerforge.com/de/shop/bricks/servo-brick.html) kostet auch 50€ und steuert 7 [Servomotoren](https://www.tinkerforge.com/de/shop/accessories/motors/servo-hitec-hs-53.html). Also wird der Roboter wohl Beine bekommen. Einfache Motoren sind zu teuer. Falsch gedacht, aber das ist nicht so schlimm. Später mehr.

Der Stepperbrick hat pro Servoausgang 3 Pole. 2x Strom und 1x eine  PWM (PulsWeitenModulation) Datenleitung. Die Servomotoren bei Tinkerforge haben Stecker die wunderbar in die Buchsen des Bricks passen. Ich freue mich, kann ich doch per Software die Stellung der Motoren steuern. Ich bin deprimiert, 60° bewegen sich die Servos. Ich finde das ausgespochen wenig. Da kann der Roboter ja kaum das Bein heben.

## Brick Stack Voltage

Interessant ist noch die Stromanzeige. Schließe ich den Servobrick per USB an den PC an, zeigt es 0V Brick Voltage. Ich habe an eine 9V Batterie 2 Kabel angelötet. Damit zeigt der Brickviewer eine external Voltage von 8,8-8,9V an. Und der Brick flacker lästig mit seiner blauen LED. Lasse ich meine 3 Servos hin und her fahren sinkt die Spannung auf 6,5-7,5V. Nach dem Halt steigt sie schnell wieder auf knapp 9V an.

**Erkenntnis**: Deswegen gibt es "Konstantstromquellen", die unter Last einen gleichmäßigeren Strom abgeben. Ein Laser würde mit solchen Batterien viel zu ungleichmäßig lasern.

Aber warum bringt das USB keine 5V internal Voltage mit? Ein powered Hub zwischen PC und Brick hat auch nicht geholfen. Brauche ich dafür eine Wifi Master Extension für 60€ um den USB Port für ein Akku Pack frei zu bekomme? Die Motoren wollen gern mehr als 5V. Also brauche ich mehr Akku. Dann könnte ich den Step-Down-Power-Supply für 20€ um mir den Anker zu sparen. Wenn die Motoren aber solche Spannungsschwankungen verursachen, ist es aber vielleicht besser die Elektronik von den Motoren zu trennen. Der Externe Strom tut es ja auch.

## Der Stepper Brick hat nur 1 Ausgang

Jetzt weiß ich auch warum. Dort kann der Motor permanent laufen und Strom durch den Brick ziehen. Das muss gekühlt werden. Mit den 60° Spielereien hat der Brick nicht so viel Last, weswegen man ihm mehrere Ausgänge zumuten kann.

## Wie fahre ich Rückwärts

Die Tinkerforge Servobrickdoku sagt "Brushless Motoren über externe ESCs ebenfalls steuerbar". Erstmal sagte mir das nichts. Momentan bin ich hier noch bei Mutmaßungen

ESC steht für Electronic Speed Control. Bei Amazon gibt es da [4er Packs ESCs](https://www.amazon.de/gp/product/B0197WP7L8/) für Dronen für 20€. Da sind einige Kabel dran. Ich sehe die 3 kleinen Steuerungskabel mit dem Stecker der auf die Servoanschlüsse passen sollten. Rot und Schwarz sind bestimmt die Stromzufuhr. Aber warum gibt es 3 blaue?

Wenn ich den Motor über die ESCs an den Servobrick anschließen kann, nehme ich an das ich bei 30° links schnell vorwärts und bei 30° rechts schnell rückwärts fahren kann. Aber die Motoren haben doch nur 2 Kontakte.

## Alternativer Weg: Fernlenkauto per Software steuern

https://www.amazon.de/dp/B01BPF6MX2 Revell Truck als Adventskalender



# Motoren

Es gibt einfache Motoren, Servos, 360° Servos und Schrittmotoren.

## normale Motoren

https://www.amazon.de/dp/B01EIYJARW 2-Rad Roboterplattform

In den Robotik Sets bei Amazon gibt es immer diese Motoren mit gelber Hülle und 2 Kontakten. Ein Kontakt ist Strom (+), einer ist Masse (-). Je nachdem wie ich die Kabel anlege, fährt er in die eine oder andere Richtung. 

Um den Motor anzusteuern nutze ich ein Raspberry Pi. Ich habe einen Raspberry Pi 2, würde mir heute aber einen 3er kaufen.

https://www.amazon.de/dp/B01CD5VC92

Am Raspberry Pi habe ich aber nur Strom, 3,3V und 5V und Masse. Ohne weiteres kann ich den Strom nicht umpolen. Des weiteren liefern die Pins nur sogenannte Steuerströme, beim Pi sind das wenige mA. Eine Status-LED kann man damit leuchten lassen, einen Motor sollte man nicht direkt da dran hängen.

Wir brauchen ein weiteres Bauteil was über ein Signal den Stromfluss steuert und das eine externe Stromquelle verwenden kann. Und wir haben Glück weil wir mit dem Problem nicht alleine sind.

https://www.amazon.de/dp/B015SQ57VC L298N H Brücke

Diese Platine gibt es von verschiedenen Herstellern, aber der Grundaufbau ist gleich. Sie macht genau was sie soll und ermöglicht die Steuerung von 2 Motoren. Der Aufbau ist fast symetrisch. Es gibt (bei der blauen 3er Dose) einen Eingang für die externe Stromquelle. Daneben ist eine Pinleiste für die Steuersachen. Die blauen 2er Dosen werden mit den Motoren verbunden. 
Immer wenn man auf einem der Steuerpins Strom anbietet fährt ein Motor in eine Richtung. Pro Motor benötigt man 2 Kabel von den GPIO Pins des Pi zur H-Brücke. Zusätzlich muss ein GND (oder Masse oder -) Pin vom Pi mit dem GND der H-Brücke (blaue 3er Gruppe, mittleres Loch) verbunden werden.

https://www.amazon.de/dp/B01EV70C78/ ein Jumperkabelset - Es ist immer gut alle 3 Varianten da zu haben

Die Geschwindigkeit wird durch PWM gesteuert. Pulsweitenmodulation heißt das in hoher Frequenz der Strom an und ausgeschaltet wird. Wenn der Strom nur in 1/3 der Zeit angeschaltet ist, wirkt er wie ein 1/3 so hoher Stromfluss. Das kann bei nodejs auf dem Raspberry Pi jeder GPIO Pin. Ich verwende hierfür pigpio

https://www.npmjs.com/package/pigpio pigpio

Damit lassen sich beliebig große Motoren recht einfach steuern. Je nach Motorgröße gibt es unterschiedliche H-Brücken. Lästigerweise hat eine H-Brücke einen Wirkungsgrad != 100%. Von dem Strom den ich anlege gehen 1-2 V in der L298N verloren.  

Bei dem oben genannten 2-Rad Bauset ist eine Halterung für 4 AA Batterien enthalten. Unter Last ist das zu wenig.  6 Batterien sind besser.

https://www.amazon.de/dp/B00QBZ7EF2 6 AA Halterung (man sollte mehrere kaufen. Der Preis ist bei 3 Stück fast gleich.)

Statt den Pi als Basis kann man auch einen Blick zu Tinkerforge werfen. Hier gibt es den DC Brick. Es ist eine H-Brücke mit Steuerlogik, USB-Anschluss und einer API in vielen Programmiersprachen. Dafür ist er etwas teurer.

https://www.tinkerforge.com/de/shop/bricks/dc-brick.html

Die Motoren sind billig, sind für jede Größenordnung zu bekommen. Aber ich kann den Motor nicht definiert eine halbe Raddrehung nach vorn fahren. Möchte man den Motor definiert kleine Winkel bewegen, kann man Servomotoren nutzen. Benötigt man einen großen Motor mit definiertem Verhalten, sollte ma sich Schrittmotoren ansehen.

## Servomotoren

Servomotoren eignen sich für Arme und Beine von Robotern. Ich habe ein Fahrzeug mit einer vertikal verstellbaren Kamerahalterung. Mit einem Servomotor stelle ich die Position ein. Mit ihnen kann man einen Winkel von 180° in sehr kleinen Schritten vor und zurück fahren. Es sind keine ganzen Drehungen möglich.

Sie haben einen standartisierten 3-Pin Anschluss, der ein schwarzes Kabel für die Masse (-), ein rotes Kabel in der Mitte für den Strom (+), und ein gelbes für die Signale. Dazu gleich mehr. Je nach Hersteller kann die Farbgebung auch etwas variieren. Von Olimex habe ich 360° Servos mit braun/rot/orangen Kabeln. Dann ist braun=schwarz und orange=gelb.

Zur Steuerung der Position wird die Pulsweite genutzt. Ich habe HiTech-53 Microservos hier.  Bei einer Pulsweite von 600ms fahren sie an die Startposition. Bei 2350ms fährt er zum anderen Ende. Gibt man Werte außerhalb des Bereichs an, stottert der Motor oder macht nichts. Es kann dabei nichts kaputt gehen.

https://www.tinkerforge.com/de/shop/accessories/motors/servo-hitec-hs-53.html

Ich hatte sie in Verbindung mit einem Servobrick von Tinkerforge gekauft. An dem kann ich 7 Servos anschließen. Das gelbe Kabel muss nach oben. 

https://www.tinkerforge.com/de/shop/bricks/servo-brick.html

Die API ist einfach und für viele Sprachen erhältlich. Zum Testen gibt es eine grafische Oberfläche.  Ich fand das wirklich einfach. Aber für ein Fahrzeug würde ich noch einen WIFI Brick oder den Red Brick benötigt. Und das wären dann 80-100€ für die Servoansteuerung gewesen. Der Raspberry Pi kann das aber auch. Und den habe ich hier schon herumliegen.

https://www.amazon.de/dp/B01CD5VC92

Den Servoconnector kann man auseinander nehmen. Ma kann die Kabel von dem Gehäuse nehmen und in einfache Hüllen von herumliegenden Jumperkabeln stecken.

https://www.amazon.de/dp/B013B0CF30

Man braucht dann nur 3 Pins. Die Pinbelegung gibt es bei google

http://raspi.tv/wp-content/uploads/2014/07/Raspberry-Pi-GPIO-pinouts.png

Das rote Kabel kommt auf ein 5V Pin oben links. Das schwarze Kabel kommt auf ein schwarzes Ground-Pin (oben, drittes von links). Es wäre jetzt zu leicht das Signal von Pin 14 direkt daneben zu beziehen. Aber der GPIO Pin hat mit UART noch eine Funktion und der Motor würde beim starten des Pis sofort Strom bekommen noch bevor das Programm läuft. Das Pin4 gegenüber funktioniert besser.

Ich programmiere es mit nodeJS und nutze pigpio.

https://www.npmjs.com/package/pigpio 

Pigpio hat eine Servo Klasse der ich die Pulsweite und ein Pin angeben kann. Wo die Grenzwerte des Servos liegen muss man wohl ausprobieren wenn es keine Dokumentation gibt. 

Stellt sich die Frage warum an einen Tinkerforge Brick 7 Servos aber nur 1 normalen Motor anschließen kann, und beim Raspberry der Servo gleich dran geht und ein Motor eine H-Brücke mit externem Strom benötigt. Die Antwort ist einfach. In der Elektrotechnik scheint meist die Abwärme der begrenzende Faktor zu sein. Die 7 Servomotoren werden nicht gleichzeitig große Lasten bewegen. wie der eine normale. Genau so wie eine LED mit 50% gepulsten 5V funktioniert ähnlich viel Wärme wie eine mit 2,5V betriebene LED.





