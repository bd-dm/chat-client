import React from 'react';

import deepEqual from 'deep-equal';

function IndexPage() {
  return (
    <p>
      Wow such home page 🐶
    </p>
  );
}

export default React.memo(IndexPage, deepEqual);
