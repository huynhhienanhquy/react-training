import ProfileCard from './ProfileCard';
import type { Person } from './ProfileCard';

export default function App() {
  const person: Person = {
    name: 'Quy Huynh',
    age: 20,
    country: 'Vietnam',
    isWorking: true,
      avatar: "https://i.pravatar.cc/150?img=3",
      skills: ['JavaScript', 'React', 'TypeScript'],
    };

    return (
      <>
        <h1>Profile Cards</h1>
        <ProfileCard person={person} />
      </>
    );
  }
