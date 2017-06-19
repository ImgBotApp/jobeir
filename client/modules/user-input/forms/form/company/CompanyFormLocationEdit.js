import React from 'react';
import CompanyFormLocationEditItem from './CompanyFormLocationEditItem';

const CompanyFormLocationEdit = ({ fields, locations }) => (
  <ul>
    {fields.map((location, index) => (
      <CompanyFormLocationEditItem
        fields={fields}
        location={location}
        locations={locations}
        index={index}
        key={location}
      />
    ))}
  </ul>
);

export default CompanyFormLocationEdit;
