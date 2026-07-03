export interface Person {
  name: string;
  age: number;
  country: string;
  isWorking: boolean;
  avatar: string;
  skills: string[];
}

interface ProfileCardProps {
  person: Person;
}

function formatAge(age: number): string {
  return `${age} years old`;
}

export default function ProfileCard({
  person,
}: ProfileCardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    width: '300px',
  };

  return (
    <div style={cardStyle}>
      <img
        src={person.avatar}
        alt={person.name}
        className="avatar"
        width={100}
      />
      <h2>{person.name}</h2>
      <p>Age: {formatAge(person.age)}</p>
      <p>Country: {person.country}</p>
      <p>Next Year: {formatAge(person.age + 1)}</p>
      <p>Status: {person.isWorking ? 'Working' : 'Student'}</p>

      <h4>Skills:</h4>
      <ul>
        {person.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
