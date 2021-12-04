import {
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import React from 'react';

export function ToolBar(): JSX.Element {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
