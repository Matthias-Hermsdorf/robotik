# Robotik
Memos eines Programmierers der auszog um Roboter zu bauen

##erste Versuche 
Von einer reparierten elektrischen Zahnbürsteaußer war außer undokumentierter Elektronik nur noch der Motor übrig. 2 Kontakte ohne Markierung.  An eine 1,5V Batterie angeschlossen drehte er sich. Drehe drehe ich die Batterie, ändert sich die Laufrichtung. Soweit ist es plausibel.

## Analog Out Bricklet und Motoren

Ich habe seit kurzen Tingerforge Bausteine. [Das Analog Out](https://www.tinkerforge.com/de/shop/bricklets/analog-out-bricklet.html)  Bricklet hat 4 Kontakte. 5V, 3.3V, Vout, Grnd. Verbinde ich 3.3V und Ground läuft der Motor vorwärts. 5V und Grnd ist schneller vorwärts. Verbinde ich 5V mit 3.3V gehen die Lichter aus und das Bricklet ist kaputt.  Gut das es nur 3€ gekostet hat. 

Aber wie mappe ich + und - auf Strom und Ground? 
Und wie mache ich das der Motor in die andere Richtung dreht?s

Laut Erinnerung fließen die Elektronen von - zu +.  Der Akku hat ein gewisses Potential, das sich über den Motor versucht auszugleichen. Also nehme ich mal an das es -3.3V sind und Ground der Pluspol. Vielleicht irre ich mich auch.

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