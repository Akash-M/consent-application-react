/* eslint-disable import/named */
import { Theme } from '@mui/material/styles';
import { createContext } from 'react';

import { AppThemes } from 'lib-components/src/theme/app-theme';

interface ThemeContextProperties {
  appTheme: AppThemes;
  setAppTheme: React.Dispatch<React.SetStateAction<AppThemes>>;
  theme: Theme;
}

export const ThemeContext = createContext<Partial<ThemeContextProperties>>({});
