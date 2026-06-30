import { useState } from "react";
import StudentCard from "./StudentCard";
import "./App.css";

interface Student {
  id: number;
  name: string;
  age: number;
  isOnline: boolean;
}

function App() {
  // State
  const [totalLike, setTotalLike] = useState(0);

  // data
  const students: Student[] = [
    {
      id: 1,
      name: "A",
      age: 20,
      isOnline: true,
    },
    {
      id: 2,
      name: "B",
      age: 21,
      isOnline: false,
    },
    {
      id: 3,
      name: "C",
      age: 22,
      isOnline: true,
    },
  ];

  function handleLike() {
    setTotalLike(totalLike + 1);
  }

  return (
    <div className="container">

      {/* JSX + Display Data */}
      <h1>Student </h1>

      <h2>Total Like: {totalLike}</h2>

      {/* Render List */}
      {
        students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onLike={handleLike}
          />
        ))
      }

    </div>
  );
}

export default App;
