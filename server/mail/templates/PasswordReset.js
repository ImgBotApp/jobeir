import React from 'react';
import Oy from 'oy-vey';

const { Table, TBody, TR, TD } = Oy;

export default props => {
  return (
    <Table width={props.maxWidth}>
      <TBody>
        <TR>
          <TD align="center">
            {props.children}
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};
