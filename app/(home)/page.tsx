import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

const API_URL = "https://billions-api.nomadcoders.workers.dev/";

async function getPeople() {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export interface Person {
  id: string;
  name: string;
  netWorth: number;
  industries: string[];
  squareImage: string;
  bio: string;
}

export default async function HomePage() {
  const people = await getPeople();
  return (
    <div className="text-white flex flex-row flex-wrap justify-evenly mt-3">
      {people.map((person: Person) => (
        <Link key={person.id} href={`/person/${person.id}`} className="transition-transform hover:scale-105">
          <div className="m-2 container">
            <Image
              src={person.squareImage}
              alt={person.name}
              height={300}
              width={300}
            />
            <h1>{person.name}</h1>
            <h1>Networth: {Math.trunc(person.netWorth / 1000)} Billion</h1>
            <h1>Industry: {person.industries.join(", ")}</h1>
            <h1>{person.bio}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
