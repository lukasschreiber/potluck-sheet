import {Link} from "react-router-dom";

export function ImprintPage() {
    return <div className={"m-10"}>
        <Link to={"/"} className={"underline"}>Home</Link>
        <h1 className={"mt-4 text-2xl"}>Impressum</h1>
    <h2 className={"mt-4 text-xl"}>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
    <p>Lukas Schreiber<br />
        Wilhelminenstra&szlig;e 24<br />
        64283 Darmstadt</p>

    <h2 className={"mt-4 text-xl"}>Kontakt</h2>
    <p>Telefon: 06151 3592359<br />
        E-Mail: info@lukasschreiber.com</p>
    </div>}