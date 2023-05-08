/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';

import { FileBrowserHandle, FileBrowserProps } from '../../types/file-browser.types';
import { FileList } from '../file-list/FileList';
import { FileBrowser } from './FileBrowser';
import { FileContextMenu } from './FileContextMenu';
import { FileNavbar } from './FileNavbar';
import { FileToolbar } from './FileToolbar';
import { important, makeGlobalChonkyStyles } from '../../util/styles';

export const FullFileBrowser = React.memo(
    React.forwardRef<FileBrowserHandle, FileBrowserProps>((props, ref) => {
        const { onScroll } = props
    const classes = useStyles();
        

        return (
           
                <FileBrowser ref={ref} {...props}>
                    <FileNavbar />
                    <FileToolbar />
                    <FileList  onScroll={onScroll}/>
                    <FileContextMenu/>
                </FileBrowser>
           
        );
    })
);
FullFileBrowser.displayName = 'FullFileBrowser';

const useStyles = makeGlobalChonkyStyles(() => ({
    '@global': {
        // '@font-face': {
        //     'font-family': 'icomoon',
        //     src:  'url("fonts/icomoon.eot?97rn2t")',
        //     src:  url('fonts/icomoon.eot?97rn2t#iefix') format('embedded-opentype'),
        //       url('fonts/icomoon.ttf?97rn2t') format('truetype'),
        //       url('fonts/icomoon.woff?97rn2t') format('woff'),
        //       url('fonts/icomoon.svg?97rn2t#icomoon') format('svg'),
        //     font-weight: normal,
        //     font-style: normal,
        //     font-display: block,
        //   }
          
        //   [class^="icon-"], [class*=" icon-"] {
        //     /* use !important to prevent issues with browser extensions that change fonts */
        //     font-family: 'icomoon' !important;
        //     speak: never;
        //     font-style: normal;
        //     font-weight: normal;
        //     font-variant: normal;
        //     text-transform: none;
        //     line-height: 1;
          
        //     /* Better Font Rendering =========== */
        //     -webkit-font-smoothing: antialiased;
        //     -moz-osx-font-smoothing: grayscale;
        //   }
          
        //   .icon-add:before {
        //     content: "\e900";
        //   }
        //   .icon-status:before {
        //     content: "\e901";
        //   }
        //   .icon-successfulStatus:before {
        //     content: "\e902";
        //   }
        //   .icon-Unsuccessful:before {
        //     content: "\e903";
        //   }
        //   .icon-upload:before {
        //     content: "\e904";
        //   }
        body: {
            backgroundColor: 'red'
        }
      }
}));

