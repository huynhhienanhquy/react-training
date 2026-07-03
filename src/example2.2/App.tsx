import Header from "./components/Header";
import Card from "./components/Card";
import StudentCard from "./components/StudentCard";
import Footer from "./components/Footer";

interface Student {
  name: string;
  age: number;
  major: string;
  avatar: string;
}

export default function App() {
  const student1: Student = {
    name: "Nguyen Van A",
    age: 21,
    major: "Information Technology",
    avatar: "https://picsum.photos/200?1",
  };

   const student2: Student = {
    name: "Tran Thi B",
    age: 20,
    major: "Software Engineering",
    avatar: "https://picsum.photos/200?2",
  };

  return (
    <>
      <Header />

      <Card>
        <StudentCard student={student1}/>
      </Card>

      <Card>
        <StudentCard student={student2} avatarSize={150}/>
      </Card>

      <Footer />
    </>
  );
}
