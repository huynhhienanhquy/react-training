import Header from "./components/Header";
import Card from "./components/Card";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer";

export default function App() {
  const student1 = {
    name: "Nguyen Van A",
    age: 21,
    major: "Information Technology",
    avatar: "https://picsum.photos/200?1",
  };

  const student2 = {
    name: "Tran Thi B",
    age: 20,
    major: "Software Engineering",
    avatar: "https://picsum.photos/200?2",
  };

  return (
    <>
      <title>Example 2.2</title>

      <Header />

      <Card>
        <StudentCard
          student={student1}
        />
      </Card>

      <Card>
        <StudentCard
          student={student2}
          avatarSize={90}
        />
      </Card>

      <Footer />
    </>
  );
}
