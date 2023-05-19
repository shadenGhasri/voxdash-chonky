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
import { useParamSelector } from '../../redux/store';



export interface FileListListProps {
    width: any;
    height: any;

}

export const ListContainer: React.FC<FileListListProps> = React.memo(props => {
    const { width, height } = props;
   
    const store = useSelector(state => state);
    console.log("store",store);
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

            console.log("displayFileIdsRef",displayFileIds[data.index]);
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

        

        return (
            <>

                <div className={classes.titleDisplay} style={{width: `${width}px`}}>
                    <div className={classes.titlecellNameDisplay}>Name</div>
                    <div className={classes.titlecellDisplay}>Status</div>
                    <div className={classes.titlecellDisplay}  >Data Modified</div>
                    <div className={classes.titlecellDisplay}>% complition</div>
                    <div className={classes.titlecellDisplay}>Usage Report</div>
                    <div className={classes.titlecellDisplay}>
                        Organizational Access
                    </div>
                    <div className={classes.titlecellDisplay}>Public Access</div>
                    <div className={classes.titlecellDisplayClick} >{" "}</div>
                </div>

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
        // paddingLeft: "99px",
    },
    titlecellDisplay: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: "center",
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
        color: '#9AA9BF',
        cursor: "pointer" ,
    },
    titlecellNameDisplay: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: "start",
        flex: '1 1 200px',
        paddingLeft: 8,
        zIndex: 20,
        color: '#9AA9BF',
    },
    titlecellDisplayClick: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: "end",
        flex: '0 1 50px',
        padding: [2, 8],
        zIndex: 20,
        color: '#9AA9BF',
        cursor: "pointer" ,
    },
}));
