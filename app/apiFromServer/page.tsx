import { headers } from 'next/headers';

export default async function APIFromServer() {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.franciskodama.com'
      : 'http://localhost:3000';

  const resp = await fetch(`${baseUrl}/api/whoAmI`, {
    method: 'GET',
    headers: headers(),
  }).then((res) => res.json());
  return (
    <div>
      <div>
        API Route From
        <span className='font-bold underline'>Server</span>
        <div>Name: {resp?.name}</div>
      </div>
    </div>
  );
}
