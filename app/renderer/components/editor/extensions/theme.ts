import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import type { DefaultTheme } from 'styled-components';
import Color from 'color';
import { headerStyles, markStyles } from './styles';

const theme = (theme: DefaultTheme): Extension => {
  const baseTheme = EditorView.baseTheme({
    '&.cm-editor': {},
    '&.cm-editor.cm-focused': { outline: 'none' },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: `${Color(theme.mainBg)
        .alpha(0.5)
        .lighten(0.8)
        .hsl()
        .string()}`,
    },
<<<<<<< HEAD
    '.cm-scroller': {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
      overflowX: 'unset',
      lineHeight: 'unset',
    },
=======
>>>>>>> 7778117 (Custom fonts for editor and interface)
    '.cm-content': {
      caretColor: theme.mainFgText,
      minHeight: '70vh', // This is sort of hacky
    },
    '.cm-line': {
      position: 'relative',
    },
  });

  const highlighter = syntaxHighlighting(
    HighlightStyle.define([...headerStyles(theme), ...markStyles(theme)])
  );

  return [baseTheme, highlighter];
};

export default theme;
