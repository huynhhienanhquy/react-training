export default function StudentCard({
  student,
  avatarSize = 120,
}) {

  function handleView() {
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

      <br />
      <br />

      <button onClick={handleView}>
        View Detail
      </button>

      <br />
      <br />

      <svg width="100" height="30">
        <rect
          width="100"
          height="30"
          fill="green"
        />
      </svg>

    </div>
  );
}
