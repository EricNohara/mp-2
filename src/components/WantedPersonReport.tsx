import { WantedPerson } from "../interfaces/WantedPersons";
import styled from "styled-components";

const WantedPersonDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  &:first-child {
    margin-top: 5%;
  }
`;

const PersonInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 5%;
`;

const PersonSpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  margin: 2% 0;
`;

const WarningMessage = styled.p`
  font-weight: bold;
  color: red;
`;

const RewardMessage = styled.p`
  color: green;
`;

const WantedImage = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
  border-radius: 10%;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -webkit-transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%);
    filter: gray;
    -webkit-filter: grayscale(0%);
    filter: none;
    transition: 0.3s ease;
  }
`;

const PersonTitle = styled.h2`
  margin-bottom: 2%;
`;

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

export default function WantedPersonReport(props: { person: WantedPerson }) {
  return (
    <>
      <WantedPersonDiv>
        <a href={props.person.url} target="_blank">
          <WantedImage
            src={props.person.images[0].original}
            alt={props.person.images[0].caption}
            loading="lazy"
          />
        </a>
        <PersonInfoDiv>
          <PersonTitle>{props.person.title}</PersonTitle>
          <i>{formatSpecialMsg(props.person.description).toLowerCase()}</i>
          <PersonSpecsGrid>
            <p>Sex: {formatInfo(props.person.sex)}</p>
            <p>Race: {formatInfo(props.person.race)}</p>
            <p>Age: {formatInfo(props.person.age_range)}</p>
            <p>Nationality: {formatInfo(props.person.nationality)}</p>
            <p>Birthplace: {formatInfo(props.person.place_of_birth)}</p>
            <p>Hair Color: {formatInfo(props.person.hair)}</p>
            <p>Eye Color: {formatInfo(props.person.eyes)}</p>
            <p>
              Weight:{" "}
              {formatNumberInfo(props.person.weight_max) !== "UNCERTAIN"
                ? formatNumberInfo(props.person.weight_max) + "lbs"
                : "UNCERTAIN"}
            </p>
          </PersonSpecsGrid>
          <WarningMessage>
            {formatSpecialMsg(props.person.warning_message)}
          </WarningMessage>
          <RewardMessage>
            {formatSpecialMsg(props.person.reward_text)}
          </RewardMessage>
        </PersonInfoDiv>
      </WantedPersonDiv>
    </>
  );
}
