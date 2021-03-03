import React from 'react';

import { render } from '@testing-library/react';

import Button from '@/components/ui/Button';

describe('Button', () => {
  it('Renders component', () => {
    render(
      <Button>
        Button title
      </Button>,
    );
  });
});
