import { info } from "console";
import { WantedPerson } from "../interfaces/WantedPersons";

function formatInfo(info: string | null): string {
  return info ? info.toUpperCase() : "UNCERTAIN";
}

function formatSpecialMsg(info: string | null): string {
  return info ? info.toUpperCase() : "";
}

function formatNumberInfo(numInfo: number | null): string {
  const infoStr: string | null = numInfo ? String(numInfo) : null;
  return infoStr ? infoStr.toUpperCase() : "UNCERTAIN";
}

export default function WantedPersonReport(props: {
  person: WantedPerson;
  key: string;
}) {
  return (
    <>
      <li key={props.key}>
        <img
          src={props.person.images[0].original}
          alt={props.person.images[0].caption}
          loading="lazy"
          height="100px" // temporary before styling
        />
        <br />
        <strong>{props.person.title}</strong>
        <p>{formatSpecialMsg(props.person.description).toLowerCase()}</p>
        <p>Sex: {formatInfo(props.person.sex)}</p>
        <p>Race: {formatInfo(props.person.race)}</p>
        <p>Age: {formatInfo(props.person.age_range)}</p>
        <p>Nationality: {formatInfo(props.person.nationality)}</p>
        <p>Hair Color: {formatInfo(props.person.hair)}</p>
        <p>Eye Color: {formatInfo(props.person.eyes)}</p>
        <p>
          Weight:{" "}
          {formatNumberInfo(props.person.weight_max) !== "UNCERTAIN"
            ? formatNumberInfo(props.person.weight_max) + "lbs"
            : "UNCERTAIN"}
        </p>
        <p>{formatSpecialMsg(props.person.warning_message)}</p>
        <p>{formatSpecialMsg(props.person.reward_text)}</p>
      </li>
    </>
  );
}
