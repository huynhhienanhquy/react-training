interface Student {
  id: number;
  name: string;
  age: number;
  isOnline: boolean;
}

interface StudentCardProps {
  student: Student;
  onLike: () => void;
}

function StudentCard({
  student,
  onLike,
}: StudentCardProps) {

  return (

    <div className="card">

      {/* Display Data */}
      <h2>{student.name}</h2>

      <p>Age: {student.age}</p>

      {/* Conditional Rendering */}
      <p>
        Status :

        {
          student.isOnline
            ? "Online"
            : "Offline"
        }

      </p>

      {/* Event */}
      <button onClick={onLike}>
        Like
      </button>

    </div>

  );
}

export default StudentCard;
