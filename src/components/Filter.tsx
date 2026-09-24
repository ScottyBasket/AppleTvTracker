import styled from "styled-components";
import AppleTVData from "../data/AppleTV";
import Show from "../assets/Show.png";
import Movie from "../assets/Movie.png";
import Negative from "../assets/Negative.png";
import Positive from "../assets/Positive.png";
import { useState } from "react";

const Card = styled.div`
  width: 45%;
  background-color: #2a2a2a;
  height: 175px;
  border-radius: 10px;
  margin: 1em auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    height: 300px;
    flex-direction: column;
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 1em auto;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 350px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px 0 0 10px;
  @media (max-width: 1200px) {
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0 0;
  }
`;

const MediaInformation = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
  color: white;
  @media (max-width: 1600px) {
    justify-content: left;
    flex-direction: column;
  }
`;

const Information = styled.div``;

const Name = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-top: 0px;
  padding-top: 0;
`;

const Length = styled.div`
  font-size: 0.9em;
`;

const Type = styled.div`
  display: flex;
  height: fit-content;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1600px) {
    justify-content: left;
    flex-direction: row;
  }
`;

const Icon = styled.img`
  height: 20px;
`;

const P = styled.div`
  padding-left: 10px;
  color: white;
  font-size: 16px;
`;

const Progress = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 30px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1600px) {
    margin-top: 30px;
  }
  @media (max-width: 1400px) {
    justify-content: left;
    margin-top: 10px;
    display: block;
  }
  @media (max-width: 1200px) {
    justify-content: space-between;
    margin-top: 0;
    display: flex;
  }
`;

const styles = {
  container: {
    height: "20px",
    width: "90%",
    backgroundColor: "#4a4a4a",
    borderRadius: "50px",
    overflow: "hidden",
    fontSize: "14px",
    marginTop: "5px",
    marginRight: "10px",
  },
  filler: {
    height: "100%",
    backgroundColor: "#FF8000",
    borderRadius: "inherit",
    transition: "width 0.2s ease-in",
  },
};

const Progressbar = ({ percentage }: { percentage: number }) => {
  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.filler,
          width: `${percentage}%`,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          paddingLeft: "10px",
          color: "white",
        }}
      >
        {`${percentage}%`}
      </div>
    </div>
  );
};

const CompletionStatus = ({ completion }: { completion: number }) => {
  if (completion > 0 && completion < 100) {
    return <Progressbar percentage={completion} />;
  } else if (completion === 100) {
    return (
      <Type>
        <Icon src={Positive}></Icon>
        <P>Completed</P>
      </Type>
    );
  } else {
    return (
      <Type>
        <Icon src={Negative}></Icon>
        <P>Not Started</P>
      </Type>
    );
  }
};

export default function FilteredList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = AppleTVData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search shows..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul>
        {filteredItems.map((item) => (
          <Card>
            <Image src={item.image}></Image>
            <MediaInformation>
              <Text>
                <Information>
                  <Name>{item.title}</Name>
                  <Length>{item.length}</Length>
                </Information>
                {item.isShow ? (
                  <Type>
                    <Icon src={Show}></Icon>
                    <P>Show</P>
                  </Type>
                ) : (
                  <Type>
                    <Icon src={Movie}></Icon>
                    <P>Movie</P>
                  </Type>
                )}
              </Text>

              <Progress>
                <CompletionStatus
                  completion={
                    item.isShow
                      ? Number(
                          (
                            ((item.episodesComplete ?? 0) /
                              (item.episodes ?? 1)) *
                            100
                          ).toFixed(2),
                        )
                      : (item.completion ?? 0)
                  }
                />
                <P style={{ paddingLeft: "0px", paddingTop: "2px" }}>Update</P>
              </Progress>
            </MediaInformation>
          </Card>
        ))}
      </ul>
    </div>
  );
}
