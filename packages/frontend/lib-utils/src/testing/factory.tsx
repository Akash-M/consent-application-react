/* eslint-disable import/named */
import { RenderResult, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export function customRenderer(
  Component: ({ children }: any) => JSX.Element,
  props?: any,
): RenderResult {
  return render(<Component {...props} />, {
    wrapper: MemoryRouter as any,
  });
}
