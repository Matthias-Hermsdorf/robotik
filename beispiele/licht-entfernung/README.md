# Licht-Entfernungs-Spielzeug
Über die Entfernung zu einem Sensor wird die Helligkeit einer LED gesteuert. Je näher ich dem Sensor komme, desto heller wird die Lampe. Das ist einfach, aber beeindruckend.
Ich habe das aufgebaut um die Tinkerforge Bausteine kennen zu lernen.

### Aufbau

Benötigt wird ein Tinkerforge [Brick]( https://www.tinkerforge.com/de/shop/bricks.html), ein [Analog Out Bricklet](https://www.tinkerforge.com/de/shop/bricklets/analog-out-bricklet.html), ein [IR Distance Bricklet](https://www.tinkerforge.com/de/shop/bricklets/distance-ir-bricklet.html) inkl Sensor und ein paar [Jumperkabel](https://www.amazon.de/Foxnovo-40-poliger-weiblichen-Breadboard-Flachbandkabel/dp/B00N1TATBM/ref=sr_1_4?ie=UTF8&qid=1481293300&sr=8-4&keywords=jumper+kabel), und eine LED. Ich habe von der 3€ Weihnachtsbeleuchtung eine abgeschnitten und hier weiter verwendet.

Der Brick muss an den Computer, die Bricklets an den Brick, der Entfernungssensor an das Bricklet und die LED an den Analog Out Bricklet. 

Die weiße LED, die ich verwende, beginnt bei 2,3V zu etwas leuchten. Bei 3.1V ist sie sehr hell. Eine höhere Spannung habe ich nicht ausprobiert. Es gibt noch einen kleinen Bereich, in dem sie noch heller leuchtet, bevor sie kaputt geht. 

### LED-Grundlagen

LEDs sind Dioden. In die eine Richtung lassen sie Strom durch. In der anderen Richtung lassen sie in ihrem Lieblingsbereich kein Strom hindurch, machen kein Licht, gehen aber auch nicht kaputt. Je nach LED Farbe ist dieser Bereich aber unterschiedlich. Um die richtige Richtung heraus zu finden, kann man die LED anschließen und im Brickviewer die Spannung langsam hoch regeln. Ist bei einer weißen LED bei 2,8V noch nichts zu sehen, ist sie falschherum angeschlossen. Eine rote LED sollte je nach Art schon bei weniger als 1.6V leuchten. Das (sehr/zu) detailierte [Elektronik-Kompendium](http://www.elektronik-kompendium.de/sites/bau/0201111.htm) hat eine Liste der LED-Spannungen. Die Werte dort sind für sehr viel Licht angegeben. Sie sollten bereits bei einer geringeren Spannung leuchten.

## Es sind keine Vorwiderstände notwendig.

Vorwiderstände sind der billigste Weg die Spannung einer Stromquelle zu begrenzen. Habe ich eine 9V Batterie, und weiß das ich für die LED 3V brauche, kann ich sie mit einem Widerstand in Reihe schalten, der 6V in Wärme umsetzt und 3V für die LED lässt. Das ist bei dem Analog Out Brick nicht notwendig. Ich kann die Ausgangsspannung festlegen.

## Kabelfarben

Wenn möglich sollte schwarz für Ground und rot für ACC verwendet werden. Schließe ich eine Batterie an die Elektronik, ist - Ground und + Strom.  Gelb ist bei Servomotoren ein Signalkabel siehe PWM. Dort fließt eine veränderbare Spannung, die für Motoren die Geschwindigkeit, für Servos die Position, und für Entfernungsmesser die Entfernung enthält

## Script starten

Ich habe [node.js](https://nodejs.org/en/) zur Programmierung verwendet. Wenn das installiert ist, müssen nur noch die Abhängigkeiten installiert

`npm install`

und muss das Script ausgeführt werden

`node licht.js`

Die Status-LED auf dem Brick leuchtet sehr grell. Aber sie läßt sich ausschalten

`node disableLED.js`

Wenn die Lampe weiter leuchtet, hat der Brick noch nicht die aktuelle Firmwareversion. Die läßt sich über den Brickviewer aktualisieren.

