![alt text](https://github.com/wesselversluis/fe3-assessment-3/blob/master/wesselversluis/screen.png)

# Assessment 3
Bekijk de visualisatie live [via deze link](https://wesselversluis.github.io/fe3-assessment-3/).

## Opdracht
Voor assessment 3 was het de bedoeling om op basis van een dataset een nuttige interactieve visualisatie te maken met D3. 

## Idee
Ik heb een dataset gevonden die mij zeer intereseert: het aantal mensen dat neergeschoten is door de politie in Amerika. 
Nadat ik in de data ben gedoken, be ik gaan schetsen om te kijken wat ik wilde gaan maken en welke data-attributen in daarvoor wilde gebruiken.
Ik wilde de politie-moorden op een scatterplot weergeven met op de Y-as de leeftijd, op de X-as de datum en twee visuale variabelen om vrouwen en mannen te onderscheiden.
Om de visualisatie interessanter en interactief te maken wilde ik een bepaalde maand selecteren en op basis daarvan een pie-chart weergeven met daarin het percentage per afkomst van de slachtoffers.
Via deze visualisatie kun je op meerdere manieren trends uit de data halen.

## Proces
Allereerst ben ik gaan kijken of ik de data direct kon gebruiken of dat ik hem eerst nog moest cleanen. Mijn data was schoon dus dit ging soepel. 
Ik heb meerdere data-attributen gecombineerd tot een value door de maand, dag en het jaar van het incident samen te voegen tot een datum die ik kon gebruiken.
Toen ben ik begonnen met het scatterplot. Als uitgangspunt heb ik de [Basic Scatterplot](https://bl.ocks.org/mbostock/3887118) van D3 gebruikt. 
Deze ben ik opnieuw gaan schrijven en aanpassen om hem te gebruiken voor mijn idee. Toen ik aan het onderzoeken was hoe ik de maanden interactief 
kon maken kwam ik op een interessantere manier om dit te doen: door de gebruiker zelf een gedeelte van het scatterplot te laten selecteren in plaats van 
enkel de volledige maanden weer te geven in een pie chart. 
Op basis van [de Brush methode](http://bl.ocks.org/rajvansia/ce6903fad978d20773c41ee34bf6735c) ben ik aan de slag gegaan. 
Uiteindelijk heb ik deze gecombineerd en mijn visualitie gemaakt.

## Features
- [d3.select](https://github.com/d3/d3-selection/blob/master/README.md#select)
- [d3.axis](https://github.com/d3/d3-axis/blob/master/README.md#_axis)
- [d3.scaleTime](https://github.com/d3/d3-scale/blob/master/README.md#scaleTime)
- [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal)
- [d3.scaleLinear](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear)
- [d3.extent](https://github.com/d3/d3-array/blob/master/README.md#extent)
- [selection.enter](https://github.com/d3/d3-selection/blob/master/README.md#selection_enter)
- [selection.exit](https://github.com/d3/d3-selection/blob/master/README.md#selection_exit)
- [d3.brushX](https://github.com/d3/d3-brush/blob/master/README.md#brushX)
- [d3.nest](https://github.com/d3/d3-collection/blob/master/README.md#nest)

## Bronvermelding
De dataset die ik heb gebruikt is afkomstig van FiveThirtyEight. 
- https://github.com/fivethirtyeight/data/blob/master/police-killings/police_killings.csv

## License
[Released under the GNU General Public License, version 3.](https://opensource.org/licenses/GPL-3.0)
