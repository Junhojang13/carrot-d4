import Image from "next/image";
const API_URL = "https://billions-api.nomadcoders.workers.dev/";

async function getPerson(id: string) {
  const response = await fetch(`${API_URL}/person/${id}`);
  return response.json();
}

export default async function PersonDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const person = await getPerson(id);
  const net = person.netWorth / 1000;
  const networth = Math.trunc(net);
  return (
    <main>
      <div className="text-white conatiner mt-12 ml-12 mr-12 mb-10 bg-neutral-900">
        <Image
          src={person.squareImage}
          alt={person.name}
          height={500}
          width={500}
        />
        <div>
          <h1 className="text-3xl mt-3 mb-3 font-bold">{person.name}</h1>
          <h1 className="text-xl mt-3">Networth: {networth} Billion</h1>
          <h1 className="text-xl mt-3">
            Industry: {person.industries.join(", ")}
          </h1>
          <h1 className="text-xl mt-3">{person.bio}</h1>
        </div>
      </div>
      <div className="container text-white bg-neutral-900 ml-12 mr-12 mb-12 w-full">
        <h1 className="text-3xl mt-5 mb-4 font-bold">Financial Assets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {person.financialAssets.map(
              (asset: {
                ticker: string;
                numberOfShares: number;
                exerciseOptionPrice?: number | undefined;
              }) => (
            <div key={asset.ticker}
              className="bg-neutral-800 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold">{asset.ticker}</h2>
              <h2 className="text-lg">Shares: {asset.numberOfShares}</h2>
              {asset.exerciseOptionPrice !== undefined && <h2 className="text-lg">Exercise Price: {asset.exerciseOptionPrice}</h2>}
            </div>
          ))}
            </div>
            </div>
    </main>
  );
}
