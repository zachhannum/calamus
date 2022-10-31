import { useEffect, useRef } from 'react';
import styled, { useTheme, css } from 'styled-components';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap } from '@codemirror/search';
import { EditorState } from '@codemirror/state';
import useStore from 'renderer/store/useStore';
import { ScrollContainer } from 'renderer/components';
import { findItemDeep } from '../TreeView/utilities';
import {
  theme,
  lineWrapping,
  markdown,
  updateSectionContent,
  hideMarkdown,
  blockquote,
  code,
  pasteEventHandler,
  search,
  placeholder,
} from './extensions';

const EditorDiv = styled.div`
  width: 100%;
  margin: auto;
  max-width: 650px;
  min-height: 100%;
  box-sizing: border-box;
  padding-top: 4vh;
  padding-bottom: 10vh;
`;

const scrollerCss = (sidebarOpen: boolean) => css`
  padding-right: 50px;
  padding-left: ${sidebarOpen ? '50px' : '125px'};
  margin-right: 5px;
  transition: padding-left 300ms ease-in-out;
`;

const Editor = () => {
  const activeSectionId = useStore((state) => state.activeSectionId);
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const styledTheme = useTheme();
  const sidebarOpen = useStore((state) => state.sidebarOpen);

  const newEditorState = (txt: string): EditorState => {
    const extensions = [
      theme(styledTheme),
      lineWrapping(),
      updateSectionContent(activeSectionId),
      search(styledTheme),
      markdown(),
      hideMarkdown(styledTheme),
      blockquote(styledTheme),
      code(styledTheme),
      history(),
      pasteEventHandler(),
      placeholder(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
    ];
    return EditorState.create({ doc: txt, extensions });
  };

  const initEditorState = (editorContent: string): EditorState => {
    const editorState = newEditorState(editorContent);
    const { setEditorState } = useStore.getState();
    setEditorState(activeSectionId, editorState);
    return editorState;
  };

  const initEditorView = (editorState: EditorState) => {
    if (editorContainerRef.current) {
      editorViewRef.current = new EditorView({
        state: editorState,
        parent: editorContainerRef.current,
      });
    }
  };

  /* Set Active Section Id */
  useEffect(() => {
    if (activeSectionId !== '' && editorContainerRef.current) {
      const { content, setPreviewContent } = useStore.getState();
      const sectionContent = findItemDeep(content, activeSectionId)?.content;
      const editorContent = sectionContent === undefined ? '' : sectionContent;
      setPreviewContent(editorContent);
      if (editorViewRef.current) {
        const { editorStateMap } = useStore.getState();
        const editorState = editorStateMap.get(activeSectionId);
        if (editorState) {
          editorViewRef.current.setState(editorState);
        } else {
          const editorState = initEditorState(editorContent);
          editorViewRef.current.setState(editorState);
        }
      } else {
        const editorState = initEditorState(editorContent);
        initEditorView(editorState);
      }
    }
  }, [activeSectionId]);

  return (
    <ScrollContainer cssMixin={scrollerCss(sidebarOpen)}>
      <EditorDiv ref={editorContainerRef} />
    </ScrollContainer>
  );
};

export default Editor;
