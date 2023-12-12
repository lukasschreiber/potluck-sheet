import {Link} from "react-router-dom";

export function PrivacyPage() {
    return <div className={"m-10"}>
        <Link to={"/"} className={"underline"}>Home</Link>
        <h1 className={"mt-4 text-2xl"}>Datenschutzerklärung</h1>
        <h2 className={"mt-4 text-xl"}>Allgemeiner Hinweis und Pflichtinformationen</h2>
        <h3 className={"mt-4 text-lg"}>Benennung der verantwortlichen Stelle</h3>
        <p className={"text-slate-600"}>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <p className={"text-slate-600"}><span
            id="s3-t-ansprechpartner">Lukas Schreiber</span><br/><span
            id="s3-t-strasse">Wilhelminenstr. 24</span><br/><span id="s3-t-plz">64283</span> <span
            id="s3-t-ort">Darmstadt</span></p>
        <p className={"text-slate-600"}>Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der
            Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).</p>
        <h3 className={"mt-4 text-lg"}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p className={"text-slate-600"}>Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf
            Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine formlose Mitteilung
            per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
            unberührt.</p>
        <h3 className={"mt-4 text-lg"}>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</h3>
        <p className={"text-slate-600"}>Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der
            zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der
            Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Der
            folgende Link stellt eine Liste der Datenschutzbeauftragten sowie deren Kontaktdaten bereit: <a
                href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                target="_blank">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>.
        </p>
        <h3 className={"mt-4 text-lg"}>Recht auf Datenübertragbarkeit</h3>
        <p className={"text-slate-600"}>Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
            automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die Bereitstellung erfolgt in einem
            maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
            verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
        <h3 className={"mt-4 text-lg"}>Recht auf Auskunft, Berichtigung, Sperrung, Löschung</h3>
        <p className={"text-slate-600"}>Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft
            über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren Empfänger und den Zweck der
            Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich
            und auch zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit über die im Impressum
            aufgeführten Kontaktmöglichkeiten an uns wenden.</p>
        <h3 className={"mt-4 text-lg"}>SSL- bzw. TLS-Verschlüsselung</h3>
        <p className={"text-slate-600"}>Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als
            Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie
            über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an
            der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der Browserzeile.</p>

        <h2 className={"mt-4 text-xl"}>Server-Log-Dateien</h2>
        <p className={"text-slate-600"}>In Server-Log-Dateien erhebt und speichert der Provider der Website automatisch Informationen, die Ihr
            Browser automatisch an uns übermittelt. Dies sind:</p>
        <ul>
            <li>
                <p className={"text-slate-600"}>Besuchte Seite auf unserer Domain</p>
            </li>
            <li>
                <p className={"text-slate-600"}>Datum und Uhrzeit der Serveranfrage</p>
            </li>
            <li>
                <p className={"text-slate-600"}>Browsertyp und Browserversion</p>
            </li>
            <li>
                <p className={"text-slate-600"}>Verwendetes Betriebssystem</p>
            </li>
            <li>
                <p className={"text-slate-600"}>Referrer URL</p>
            </li>
            <li>
                <p className={"text-slate-600"}>Hostname des zugreifenden Rechners</p>
            </li>
            <li>
                <p className={"text-slate-600"}>IP-Adresse</p>
            </li>
        </ul>
        <p className={"text-slate-600"}>Es findet keine Zusammenführung dieser Daten mit anderen Datenquellen statt. Grundlage der Datenverarbeitung
            bildet Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder
            vorvertraglicher Maßnahmen gestattet.</p>

        <h2 className={"mt-4 text-xl"}>Registrierung auf dieser Website</h2>
        <p className={"text-slate-600"}>Zur Nutzung bestimmter Funktionen können Sie sich auf unserer Website registrieren. Die übermittelten Daten
            dienen ausschließlich zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes. Bei der Registrierung
            abgefragte Pflichtangaben sind vollständig anzugeben. Andernfalls werden wir die Registrierung ablehnen.</p>
        <p className={"text-slate-600"}>Im Falle wichtiger Änderungen, etwa aus technischen Gründen, informieren wir Sie per E-Mail. Die E-Mail wird
            an die Adresse versendet, die bei der Registrierung angegeben wurde.</p>
        <p className={"text-slate-600"}>Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage Ihrer Einwilligung (Art.
            6 Abs. 1 lit. a DSGVO). Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den
            Widerruf genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bereits erfolgten
            Datenverarbeitung bleibt vom Widerruf unberührt.</p>
        <p className={"text-slate-600"}>Wir speichern die bei der Registrierung erfassten Daten während des Zeitraums, den Sie auf unserer Website
            registriert sind. Ihren Daten werden gelöscht, sollten Sie Ihre Registrierung aufheben. Gesetzliche
            Aufbewahrungsfristen bleiben unberührt.</p>

        <h2 className={"mt-4 text-xl"}>Speicherdauer von Beiträgen und Kommentaren</h2>
        <p className={"text-slate-600"}>Beiträge und Kommentare sowie damit in Verbindung stehende Daten, wie beispielsweise IP-Adressen, werden
            gespeichert. Der Inhalt verbleibt auf unserer Website, bis er vollständig gelöscht wurde oder aus
            rechtlichen Gründen gelöscht werden musste.</p>
        <p className={"text-slate-600"}>Die Speicherung der Beiträge und Kommentare erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
            DSGVO). Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf genügt
            eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit bereits erfolgter Datenverarbeitungsvorgänge bleibt
            vom Widerruf unberührt.</p>

        <h2 className={"mt-4 text-xl"}>Cookies</h2>
        <p className={"text-slate-600"}>Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät
            speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu
            machen.</p>
        <p className={"text-slate-600"}>Einige Cookies sind “Session-Cookies.” Solche Cookies werden nach Ende Ihrer Browser-Sitzung von selbst
            gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese selbst löschen. Solche
            Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.</p>
        <p className={"text-slate-600"}>Mit einem modernen Webbrowser können Sie das Setzen von Cookies überwachen, einschränken oder unterbinden.
            Viele Webbrowser lassen sich so konfigurieren, dass Cookies mit dem Schließen des Programms von selbst
            gelöscht werden. Die Deaktivierung von Cookies kann eine eingeschränkte Funktionalität unserer Website zur
            Folge haben.</p>
        <p className={"text-slate-600"}>Das Setzen von Cookies, die zur Ausübung elektronischer Kommunikationsvorgänge oder der Bereitstellung
            bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorb) notwendig sind, erfolgt auf Grundlage von Art.
            6 Abs. 1 lit. f DSGVO. Als Betreiber dieser Website haben wir ein berechtigtes Interesse an der Speicherung
            von Cookies zur technisch fehlerfreien und reibungslosen Bereitstellung unserer Dienste. Sofern die Setzung
            anderer Cookies (z.B. für Analyse-Funktionen) erfolgt, werden diese in dieser Datenschutzerklärung separat
            behandelt.</p>

        <p className={"text-slate-600"}><small>Quelle: Datenschutz-Konfigurator von <a href="https://www.mein-datenschutzbeauftragter.de"
                                                          target="_blank">Mein-Datenschutzbeauftragter.de</a></small>
        </p></div>
}