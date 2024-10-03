import WantedPerson from "../interfaces/WantedPersons";
import styled from "styled-components";

// styled components used to style the wanted person fields
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

// helper function which returns placeholder if the fetched data has NULL as a field
function formatInfo(info: string | null, placeholder: string): string {
  return info ? info.toUpperCase() : placeholder;
}

// helper function to handle number info and convert it to string
function formatNumberInfo(numInfo: number | null): string {
  const infoStr: string | null = numInfo ? String(numInfo) : null;
  return formatInfo(infoStr, "UNCERTAIN");
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
          <i>{formatInfo(props.person.description, "").toLowerCase()}</i>
          <PersonSpecsGrid>
            <p>Sex:</p>
            <p>{formatInfo(props.person.sex, "UNCERTAIN")}</p>
            <p>Race:</p>
            <p>{formatInfo(props.person.race, "UNCERTAIN")}</p>
            <p>Age:</p>
            <p>{formatInfo(props.person.age_range, "UNCERTAIN")}</p>
            <p>Nation:</p>
            <p>{formatInfo(props.person.nationality, "UNCERTAIN")}</p>
            <p>Birth:</p>
            <p>{formatInfo(props.person.place_of_birth, "UNCERTAIN")}</p>
            <p>Hair:</p>
            <p>{formatInfo(props.person.hair, "UNCERTAIN")}</p>
            <p>Eye:</p>
            <p>{formatInfo(props.person.eyes, "UNCERTAIN")}</p>
            <p>Weight:</p>
            <p>
              {formatNumberInfo(props.person.weight_max) !== "UNCERTAIN"
                ? formatNumberInfo(props.person.weight_max) + "lbs"
                : "UNCERTAIN"}
            </p>
          </PersonSpecsGrid>
          <WarningMessage>
            {formatInfo(props.person.warning_message, "")}
          </WarningMessage>
          <RewardMessage>
            {formatInfo(props.person.reward_text, "")}
          </RewardMessage>
        </PersonInfoDiv>
      </WantedPersonDiv>
    </>
  );
}
