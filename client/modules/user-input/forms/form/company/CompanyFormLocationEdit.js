// @flow
import React from 'react';
import CompanyFormLocationEditItem from './CompanyFormLocationEditItem';

const CompanyFormLocationEdit = (props: {
  fields: Array<{}>,
  locations: Array<{}>
}) => {
  const { fields, locations } = props;

  return (
    <ul>
      {fields.map((location, index) =>
        <CompanyFormLocationEditItem
          fields={fields}
          location={location}
          locations={locations}
          index={index}
          key={location}
        />
      )}
    </ul>
  );
};

export default CompanyFormLocationEdit;
