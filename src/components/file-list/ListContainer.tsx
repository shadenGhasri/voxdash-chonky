/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';
import { useInstanceVariable } from '../../util/hooks-helpers';
import { makeLocalChonkyStyles } from '../../util/styles';
import { SmartFileEntry } from './FileEntry';

export interface FileListListProps {
    width: any;
    height: any;
}

export const ListContainer: React.FC<FileListListProps> = React.memo(props => {
    const { width, height } = props;

    const viewConfig = useSelector(selectFileViewConfig);

    const listRef = useRef<FixedSizeList>();

    const displayFileIds = useSelector(selectors.getDisplayFileIds);
    const displayFileIdsRef = useInstanceVariable(displayFileIds);
    const getItemKey = useCallback(
        (index: number) => displayFileIdsRef.current[index] ?? `loading-file-${index}`,
        [displayFileIdsRef]
    );

    const classes = useStyles();
    const listComponent = useMemo(() => {
        const rowRenderer = (data: { index: number; style: CSSProperties }) => {
            return (
                <div style={data.style}>
                    <SmartFileEntry
                        fileId={displayFileIds[data.index] ?? null}
                        displayIndex={data.index}
                        fileViewMode={FileViewMode.List}
                    />
                </div>
            );
        };

        type RowProps = {
            index: number;
            style: React.CSSProperties;
            data: any;
          }

        const title : any = [
            { id: 0, name: 'Name' },
            { id: 1, name: 'Status' },
            { id: 2, name: 'Data modified' },

            { id: 3, name: '% complition' },
            { id: 4, name: 'Usage report' },
            { id: 5, name: 'Organizational Access' },
        ];

        const TitleRenderer = ({ index, style, data }: RowProps) => {

            const { id, name } = data[index];
            return (
                <>
                    {/* <div className={classes.titleDisplay}> */}
                    {/* <div className={classes.titlecellNameDisplay}>Name</div> */}
                    {/* <div className={classes.titlecellDisplay}>Status</div>
                        <div className={classes.titlecellDisplay}>Data modified</div>
                        <div className={classes.titlecellDisplay}>% complition</div>
                        <div className={classes.titlecellDisplay}>Usage report</div>
                        <div className={classes.titlecellDisplay}>
                            Organizational Access
                        </div> */}
                    {/* </div> */}

                    <div style={style}>
      {id}: {name}
    </div>
                </>
            );
        };

        return (
            <>
                <FixedSizeList
                    ref={listRef as any}
                    itemKey={getItemKey}
                    height={35}
                    itemCount={1}
                    itemSize={100}
                    layout="horizontal"
                    width={1000}
                >
                    {TitleRenderer}
                </FixedSizeList>

                {/* <div className={classes.titleDisplay}>
                    <div className={classes.titlecellNameDisplay}>Name</div>
                    <div className={classes.titlecellDisplay}>Status</div>
                    <div className={classes.titlecellDisplay}>Data modified</div>
                    <div className={classes.titlecellDisplay}>% complition</div>
                    <div className={classes.titlecellDisplay}>Usage report</div>
                    <div className={classes.titlecellDisplay}>
                        Organizational Access
                    </div>
                    <div className={classes.titlecellDisplay}>Public Access</div>
                </div> */}

                <FixedSizeList
                    ref={listRef as any}
                    className={classes.listContainer}
                    itemSize={viewConfig.entryHeight}
                    height={height}
                    itemCount={displayFileIds.length}
                    width={width}
                    itemKey={getItemKey}
                >
                    {rowRenderer}
                </FixedSizeList>
            </>
        );
    }, [
        classes.listContainer,
        viewConfig.entryHeight,
        height,
        displayFileIds,
        width,
        getItemKey,
    ]);

    return listComponent;
});

const useStyles = makeLocalChonkyStyles(theme => ({
    listContainer: {
        borderTop: `solid 1px ${theme.palette.divider}`,
    },
    titleDisplay: {
        display: 'flex',
        flexDirection: 'row',
        // width: '100%',
        // backgroundColor : "red"
    },
    titlecellDisplay: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
        color: '#9AA9BF',
    },
    titlecellNameDisplay: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        flex: '1 1 300px',
        paddingLeft: 8,
        zIndex: 20,
        color: '#9AA9BF',
    },
}));
