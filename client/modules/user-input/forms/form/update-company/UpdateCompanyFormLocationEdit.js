// @flow
import React from 'react';
import UpdateCompanyFormLocationEditItem from './UpdateCompanyFormLocationEditItem';

const UpdateCompanyFormLocationEdit = (props: {
  fields: Array<{}>,
  locations: Array<{}>
}) => {
  const { fields, locations } = props;

  return (
    <ul>
      {fields.map((location, index) =>
        <UpdateCompanyFormLocationEditItem
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

export default UpdateCompanyFormLocationEdit;
