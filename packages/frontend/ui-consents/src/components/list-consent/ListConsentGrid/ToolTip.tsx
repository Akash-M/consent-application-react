import Tooltip from '@mui/material/Tooltip';
import React from 'react';

export interface ToolTipInterface {
  value: string;
}

export function ToolTip({ value }: ToolTipInterface): JSX.Element {
  return (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  );
}
