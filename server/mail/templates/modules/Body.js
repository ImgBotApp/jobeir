import React from 'react';
import { Table, TBody, TR, TD } from 'oy-vey';

import EmptySpace from './EmptySpace';

export default props => {
  const textStyle = {
    color: '#262626',
    backgroundColor: '#fff',
    fontFamily: '"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif',
    fontSize: '18px'
  };

  return (
    <Table width="100%">
      <TBody>
        <TR>
          <TD style={textStyle}>
            <EmptySpace height={10} />
            {props.children}
            <EmptySpace height={50} />
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};
