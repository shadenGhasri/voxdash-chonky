import React, { useContext, useMemo, useState } from 'react';

import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, makeLocalChonkyStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import {
    useDndIcon,
    useFileEntryHtmlProps,
    useFileEntryState,
} from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, useCommonEntryStyles } from './GridEntryPreview';

interface StyleState {
    entryState: FileEntryState;
    dndState: DndEntryState;
}

export const ContextMenuComponent: any = React.memo(
    ({ file, selected, focused, dndState, display }: any) => {
        const entryState: FileEntryState = useFileEntryState(file, selected, focused);
        const styleState = useMemo<StyleState>(
            () => ({
                entryState,
                dndState,
            }),
            [dndState, entryState]
        );
        const classes = useStyles(styleState);
        const commonClasses = useCommonEntryStyles(entryState);

        const [hover, setHover] = useState(false);
        const [hoverIndex, setHoverIndex] = useState(100);

        const menuItems = [
            { title: 'open selection' },
            { title: 'Set VoxDash link' },
            { title: 'View report' },
            { title: 'Rename Project' },
            { title: 'Delete Project' },
        ];
        return (
            <>
                <div
                    className={
                        display ? classes.ShowContextMenu : classes.hiddenContextMenu
                    }
                >
                    {menuItems.map((e, i) => {
                        <>
                            <div
                                onMouseEnter={() => {
                                    setHover(true), setHoverIndex(i);
                                }}
                                onMouseLeave={() => {
                                    setHover(false), setHoverIndex(i);
                                }}
                                className={
                                    hover && hoverIndex == i
                                        ? classes.ContextMenuItemHover
                                        : classes.ContextMenuItem
                                }
                            >
                                {e.title}
                            </div>
                        </>;
                    })}
                </div>
            </>
        );
    }
);

const useStyles = makeLocalChonkyStyles(theme => ({
    ShowContextMenu: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        boxSizing: 'border-box',
        fontSize: theme.fontSizes.rootPrimary,
        width: '179px',
        height: '100px',
        padding: '5px',
        // height: '50px',
        position: 'absolute',
        zIndex: 1000000,
        right: '50px',
        top: '25px',
        background: '#FFFFFF',
        boxShadow:
            ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
        borderRadius: '8px',
    },
    hiddenContextMenu: {
        display: 'none',
    },
    ContextMenuItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        color: '#000000',
    },
    ContextMenuItemHover: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        color: '#1A5DBC',
    },
}));
