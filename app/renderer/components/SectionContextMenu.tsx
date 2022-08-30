import { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import Color from 'color';
import {
  SectionDeleteIcon,
  SectionDuplicateIcon,
  SectionRenameIcon,
  SectionOpenIcon,
} from 'renderer/icons';
import {
  Section,
  SectionContextMenuEvent,
  SectionContextMenuClosedEvent,
  SectionContextMenuEventData,
  SectionType,
  SectionIdentifier,
} from 'types/types';
import useStore from '../store/useStore';
import {
  findItemDeep,
  removeItem,
  duplicateSection,
} from './TreeView/utilities';
import { ContextMenu } from '.';
import type { Position } from './ContextMenu';

const StyledContextMenuItem = styled.div`
  user-select: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8em;
  width: 100%;

  color: ${(p) => p.theme.mainFgTextSecondary};

  &:hover {
    background-color: ${(p) =>
      Color(p.theme.contextMenuBg).lighten(0.6).hsl().string()};
  }
  &:active {
    background-color: ${(p) =>
      Color(p.theme.contextMenuBg).darken(0.2).hsl().string()};
  }

  transition: background-color 100ms ease-in-out;
`;

const SectionContextMenu = () => {
  const [id, setId] = useState<SectionIdentifier>({ id: '', name: '' });
  const [isFolder, setIsFolder] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [renameSelected, setRenameSelected] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const theme = useTheme();
  useEffect(() => {
    const handleSectionContextMenu = (e: CustomEventInit) => {
      const { id, name, x, y } = e.detail as SectionContextMenuEventData;
      setPosition({ x, y });
      setShowMenu(true);
      setId({ id, name });
      const { content } = useStore.getState();
      const item = findItemDeep(content, id) as Section;
      setIsFolder(item.type === SectionType.folder);
    };

    document.addEventListener(
      SectionContextMenuEvent,
      handleSectionContextMenu
    );

    return () => {
      document.removeEventListener(
        SectionContextMenuEvent,
        handleSectionContextMenu
      );
    };
  }, [showMenu, setShowMenu]);

  useEffect(() => {
    if (!showMenu && id.id !== '') {
      const contextClosedEvent = new CustomEvent(
        SectionContextMenuClosedEvent,
        {
          detail: { id: id.id, name: id.name, rename: renameSelected },
        }
      );
      document.dispatchEvent(contextClosedEvent);
      setRenameSelected(false);
    }
  }, [showMenu, id, renameSelected]);

  /* Menu Item handlers */
  const handleOpen = () => {
    const { setActiveSectionId } = useStore.getState();
    setActiveSectionId(id);
    setShowMenu(false);
  };

  const handleDuplicate = () => {
    const { content, setContentArray, setAddingSections } = useStore.getState();
    setAddingSections(true);
    setContentArray(duplicateSection(id.id, content));
    setTimeout(() => {
      setAddingSections(false);
    }, 10);
    setShowMenu(false);
  };

  const handleRename = () => {
    setRenameSelected(true);
    setShowMenu(false);
  };

  const handleDelete = () => {
    const { content, setContentArray, activeSectionId, setActiveSectionId } =
      useStore.getState();
    setContentArray(removeItem(content, id.id));
    if (id.id === activeSectionId) {
      setActiveSectionId({ id: '', name: '' });
    }
    setShowMenu(false);
  };

  const itemIconProps = {
    size: '15px',
    color: theme.mainFgTextSecondary,
  };

  return (
    <ContextMenu
      showMenu={showMenu}
      onCloseMenu={() => {
        setShowMenu(false);
      }}
      position={position}
    >
      {!isFolder && (
        <StyledContextMenuItem onClick={handleOpen}>
          <SectionOpenIcon {...itemIconProps} />
          <span>Open in Editor</span>
        </StyledContextMenuItem>
      )}
      <StyledContextMenuItem onClick={handleRename}>
        <SectionRenameIcon {...itemIconProps} />
        Rename
      </StyledContextMenuItem>
      <StyledContextMenuItem onClick={handleDuplicate}>
        <SectionDuplicateIcon {...itemIconProps} />
        Duplicate
      </StyledContextMenuItem>
      <StyledContextMenuItem onClick={handleDelete}>
        <SectionDeleteIcon {...itemIconProps} />
        Delete
      </StyledContextMenuItem>
    </ContextMenu>
  );
};

export default SectionContextMenu;
