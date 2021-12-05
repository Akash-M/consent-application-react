/* eslint-disable import/named */
import { RenderResult, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export function customRenderer(
  Component: ({ children }: any) => JSX.Element,
  store: any,
  props?: any,
): RenderResult {
  return render(
    <Provider store={store}>
      <Component {...props} />
    </Provider>,
    {
      wrapper: MemoryRouter as any,
    },
  );
}
