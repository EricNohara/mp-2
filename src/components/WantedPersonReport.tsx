import { WantedPerson } from "../interfaces/WantedPersons";

export default function WantedPersonReport(props: {
  person: WantedPerson;
  key: string;
}) {
  return (
    <>
      <li key={props.person.uid}>
        <strong>{props.person.title}</strong>: {props.person.sex}
      </li>
    </>
  );
}
