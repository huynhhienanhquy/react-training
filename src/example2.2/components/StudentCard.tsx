interface Student {
  name: string;
  age: number;
  major: string;
  avatar: string;
}

interface StudentCardProps {
  student: Student;
  avatarSize?: number;
}

export default function StudentCard({
  student,
  avatarSize = 100,
}: StudentCardProps) {
  function handleView(): void {
    alert(student.name);
  }

  return (
    <div>
      <img
        src={student.avatar}
        alt={student.name}
        width={avatarSize}
        height={avatarSize}
      />
      <h2>{student.name}</h2>
      <p>Age: {student.age}</p>
      <p>Major: {student.major}</p>
      <input
        type="text"
        placeholder="Write a note..."
      />
      <button onClick={handleView}>
        View Detail
      </button>
      <br />

      <svg
        width="100"
        height="30"
      >
        <rect
          width="100"
          height="30"
          fill="blue"
        />
      </svg>
    </div>
  );
}
