'use client';

import { useState } from 'react';

export default function WhoAmIButton({
  whoAmIAction,
}: {
  whoAmIAction: () => Promise<string>;
}) {
  const [name, setName] = useState<string>();
  return (
    <>
      <button
        onClick={async () => {
          setName(await whoAmIAction());
        }}
      >
        Who am I?
      </button>
      {name && <div>You are {name}</div>}
    </>
  );
}
