import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

class People extends Component {
  render() {
    return (
      <div>
        People
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies
});

export default connect(mapStateToProps)(People);

const PeopleContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
