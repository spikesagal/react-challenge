import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import Layout from './Layout';

describe(Layout, () => {
  it('should render nested route', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div data-testid="nested">Nested Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('nested')).to.exist;
  });
});
