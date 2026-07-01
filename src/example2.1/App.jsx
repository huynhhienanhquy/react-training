import ProfileCard from "./ProfileCard";

export default function App() {

  const person = {
    name: "Quy Huynh",
    age: 20,
    country: "Vietnam",
    isWorking: true,
    avatar:
      "https://i.pravatar.cc/150?img=3",

    skills: [
      "React",
      "JavaScript",
      "TypeScript",
      "NodeJS",
    ],
  };

  return (
    <>
      <h1>React Basic Example</h1>
      <ProfileCard person={person} />
    </>
  );
}
