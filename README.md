# ESTATESTAR – Optimierung auf Basis der Originalkopie

Stand: 18.10.2026. Zweite, getrennte GitHub-Seite nach Davids ausdrücklicher Korrektur. Grundlage ist die statische Originalkopie aus `estatestar-preview`, Commit `0636bd260cdce4b2e8e8ecaf61a07a726cb5c2c2`. Die Referenz wird durch Änderungen in diesem Repository nicht verändert.

## Vergleich

- Originalgetreue Referenz: https://davidkatz2305.github.io/estatestar-preview/
- Optimierte Fassung: https://davidkatz2305.github.io/estatestar-optimiert/

Die 14 deutschen und englischen Seiten behalten Originalstruktur, Branding, Texte, Foto-Unterseiten, Filme, Rundgänge und Team. Die gezielten Ergänzungen liegen in `enhancements.css` und `enhancements.js`. Die Bildzuordnung liegt in `image-map.json`.

## Gezielt verbessert

1. **Magnetisches Einrasten auf Desktop und Mobil.** Native Scroll-Snap-Punkte auf den Hauptabschnitten. Keine Wheel-/Touch-Blockade, keine animierten Vollseiten-Frameworks. Lange mobile Abschnitte bleiben innerhalb des Abschnitts scrollbar. Die zuvor verschachtelte Body-Scrollfläche wird aufgehoben, damit die Einrastpunkte am Dokument greifen. Eine kleine Abschnittsnavigation erlaubt direkte Vor-/Zurück-Schritte. Im Kontakt-Footer abschaltbar; bei reduzierter Bewegung automatisch aus.
2. **Schärfere Galeriebilder.** Größere, bereits vorhandene Originalmotive als WebP ersetzen die 300-Pixel-Vorschauen. Reihenfolge und vorhandene Filter bleiben erhalten. Nachgeladene Filterinhalte werden ebenfalls angepasst.
3. **Mobile Filter.** Die vier Foto-Kategorien sind auf zwei kompakte Zeilen verteilt. Mindestens 44 Pixel hohe Bedienflächen sowie Tastaturbedienung und Fokusmarkierungen.
4. **Originalvideos steuerbar.** Wiedergabe/Pause direkt im Abschnitt. Videos pausieren außerhalb des sichtbaren Bereichs und berücksichtigen die Systemeinstellung für reduzierte Bewegung.
5. **Kontakt mit ehrlichem Versandweg.** Vorhandenes Formulardesign, beschriftete Felder und optionale Telefonnummer. Die Schaltfläche bereitet eine E-Mail vor; erst der Besucher öffnet und versendet sie in seinem E-Mail-Programm. Kein Formularserver, kein vorgetäuschter Versand, keine gespeicherten Formulardaten.
6. **Eigener KI-Abschnitt im bestehenden Stil.** Home Staging, Renovierungsvisionen und Immobilienclips als gekennzeichneter Angebotsentwurf. Abgebildet sind bestehende Originalaufnahmen als mögliche Arbeitsgrundlage, keine KI-Referenzen oder erfundenen Vorher/Nachher-Ergebnisse. Keine erfundenen Preise, Lieferfristen oder Erfolgszahlen.
7. **Zugänglichkeit.** Tastaturbedienbare Galeriefilter, fokussierbare Team-Karten, sichtbare Fokusmarkierung, beschriftete Formulare und Bewegungspräferenzen.

## KI-Recherche und Einordnung

Die Empfehlungen knüpfen an die vorhandene Foto-/Film-/Digital-Lab-Kompetenz an. Sie sind eine Positionierungsempfehlung, keine Behauptung, dass jedes Immobilienunternehmen diese Leistungen zwingend benötigt. Generische Exposé-Texte bieten weniger Differenzierung, weil Portale diese Funktion bereits selbst anbieten.

- [ImmoScout24, 03.04.2025: KI-Suche, Preiskarten und Wohnvision](https://www.immobilienscout24.de/unternehmen/fileadmin/user_upload/20250403_IS24_New_AI_Search.pdf): virtuelle Einrichtungsstile sind bereits Bestandteil eines großen deutschen Immobilienportals. Daraus folgt die Empfehlung, mit kuratierter Bildgestaltung und Qualitätskontrolle zu differenzieren; die genannten Plattform-Nachfragewerte sind kein Wirkungsbeleg für ESTATESTAR.
- [ZIA/EY, 09.09.2025: Immobilienwirtschaft im Umbruch](https://zia-deutschland.de/pressrelease/immobilienwirtschaft-im-umbruch-was-10-jahre-digitalisierung-zeigen/): KI als Branchenthema, nicht als Erfolgsgarantie einzelner Leistungen.
- [Adobe Firefly: Home Design](https://www.adobe.com/products/firefly/features/ai-room-design/home-design.html), geprüft 18.10.2026: Möglichkeiten für Raum-, Material- und Einrichtungskonzepte. Anbieterbeschreibung, keine unabhängige Wirksamkeitsstudie.
- [Adobe: Transform image to video](https://helpx.adobe.com/photoshop/desktop/app-integrations/transform-image-to-video.html): ergänzender Bild-zu-Video-Workflow. Immobiliengeometrie und tatsächlicher Bestand müssen manuell geprüft werden.

## Betrieb und Abhängigkeiten

Buildlose statische Website, GitHub Pages auf `main` im Wurzelverzeichnis, `.nojekyll`. Gemeinsame Originalmedien, Schriften und Elementor-Dateien werden bewusst aus dem unveränderten Referenzprojekt unter `/estatestar-preview/` geladen. Dadurch enthalten beide Repositories keine doppelten mehrere hundert MB großen Videobestände. Beide Repositories gehören demselben GitHub-Konto; die Referenz muss erreichbar bleiben.

Lokal den gemeinsamen übergeordneten Ordner bereitstellen und `/estatestar-optimiert/` öffnen. `.gitignore` schließt lokale Prüfungen aus. Alle öffentlichen Seiten bleiben `noindex,nofollow`. Externe 360-Touren verbleiben beim ursprünglichen Anbieter. Die rechtlichen Texte sind vom Original übernommen und vor einem späteren Produktivstart an Hosting und tatsächliche Dienste anzupassen.

Die 17 Portfoliofilme verwenden dieselben 720p-Testfassungen wie die Referenz; Originale wurden lokal gesichert. Kein Zugriff auf das bisherige WordPress-/Elementor-Backend. Die Strato-Website bleibt unverändert.
