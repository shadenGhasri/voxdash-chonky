import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectToolbarItems } from '../../redux/selectors';
import { makeGlobalChonkyStyles } from '../../util/styles';
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';

export interface FileToolbarProps {}






export const FileToolbar: React.FC<FileToolbarProps> = React.memo(() => {
    const classes = useStyles();
    const toolbarItems = useSelector(selectToolbarItems);

    console.log("toolbarItems", toolbarItems)

    const toolbarItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        for (let i = 0; i < toolbarItems.length; ++i) {
            const item = toolbarItems[i];
            console.log("item", item)
            
            const key = `toolbar-item-${typeof item === 'string' ? item : item.name}`;
            const component =
                typeof item === 'string' ? (
                    <>
                    <SmartToolbarButton key={key} fileActionId={item} />
                    </>
                ) : (
                    <>
                        <ToolbarDropdown
                            key={key}
                            name={item.name}
                            fileActionIds={item.fileActionIds}
                        />
                    </>
                );
            components.push(component);
        }
        return components;
    }, [toolbarItems]);

    return (
       <>
        <div className={classes.toolbarWrapper}>
            <div className={classes.toolbarContainer} >
                <div className={classes.toolbarLeft}>
                    <ToolbarInfo />
                </div>
                <div className={classes.toolbarItem}  >New project</div>
                <div className={classes.toolbarItem}>Bulk Project Upload</div>
               


                <div className={classes.toolbarRight}>{toolbarItemComponents} 
              
                
                </div>
                <ToolbarSearch />
                
            </div>
        </div>
         
       </>
    );
});

const useStyles = makeGlobalChonkyStyles(theme => ({
    toolbarWrapper: {},
    toolbarContainer: {
        flexWrap: 'wrap-reverse',
        display: 'flex',
        alignItems : "start",
        
       
    },
    toolbarLeft: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'nowrap',
        flexGrow: 10000,
        display: 'flex',
    },
    toolbarLeftFiller: {
        flexGrow: 10000,
    },
    toolbarRight: {
        paddingBottom: theme.margins.rootLayoutMargin,
        flexWrap: 'nowrap',
        display: 'flex',
        paddingRight : "48px"
       
    },
    toolbarItem: {
        flexWrap: 'wrap-reverse',
        display: 'flex',
        alignItems : "start",
        color : "#1A5DBC" ,
        paddingRight : "48px",
        paddingTop : "4px",


       
    },
}));
