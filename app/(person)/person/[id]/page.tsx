import { API_URL } from "../../../(home)/page";
import Image from "next/image";

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
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Ticker</th>
              <th className="px-4 py-2">Shares</th>
              <th className="px-4 py-2">Exercise Price</th>
            </tr>
          </thead>
          <tbody>
            {person.financialAssets.map(
              (asset: {
                ticker: string;
                numberOfShares: number;
                exerciseOptionPrice?: number | undefined;
              }) => (
                <tr key={asset.ticker}>
                  <td className="border px-4 py-2">{asset.ticker}</td>
                  <td className="border px-4 py-2">{asset.numberOfShares}</td>
                  <td className="border px-4 py-2">
                    {asset.exerciseOptionPrice || "N/A"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
