import React from 'react';

import Link from 'next/link';

export default function IndexPage() {
  return (
    <div>
      <p>
        Hello world!
      </p>
      <p>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </p>
      <p>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
      </p>
    </div>
  );
}
