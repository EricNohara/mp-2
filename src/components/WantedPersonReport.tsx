import WantedPerson from "../interfaces/WantedPersons";
import styled from "styled-components";

const WantedPersonDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 2%;
  align-items: center;

  &:first-child {
    margin-top: 5%;
  }

  &:last-child {
    margin-bottom: 5%;
  }

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

const PersonInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 5%;
  overflow-x: hidden;
  min-width: 300px;
  @media screen and (max-width: 650px) {
    font-size: 0.75rem;
  }
`;

const PersonSpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 1%;
  margin: 2% 0;
  text-overflow: none;
`;

const WarningMessage = styled.p`
  font-weight: bold;
  color: #f88379;
  margin-bottom: 2%;
`;

const RewardMessage = styled.p`
  color: #c1e899;
  margin-bottom: 2%;
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

  @media screen and (max-width: 850px) {
    margin-bottom: 5%;
    height: 150px;
    width: 150px;
  }
`;

const PersonTitle = styled.h2`
  margin-bottom: 2%;

  @media screen and (max-width: 650px) {
    font-size: 1rem;
  }
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
            <p>Sex:</p>
            <p>{formatInfo(props.person.sex)}</p>
            <p>Race:</p>
            <p>{formatInfo(props.person.race)}</p>
            <p>Age:</p>
            <p>{formatInfo(props.person.age_range)}</p>
            <p>Nation:</p>
            <p>{formatInfo(props.person.nationality)}</p>
            <p>Birth:</p>
            <p>{formatInfo(props.person.place_of_birth)}</p>
            <p>Hair:</p>
            <p>{formatInfo(props.person.hair)}</p>
            <p>Eye:</p>
            <p>{formatInfo(props.person.eyes)}</p>
            <p>Weight:</p>
            <p>
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
