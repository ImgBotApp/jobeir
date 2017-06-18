import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import ShellHeaderTitleJob from './ShellHeaderTitleJob';
/**
 * <ShellHeaderTitle />
 * Takes care of the dropdown on the top right of the screen
 * and dispalys the header text based on the Route name
 */
class ShellHeaderTitle extends Component {
  buildHeaderText(text) {
    const { params } = this.props;

    switch (text) {
      case 'Job':
        return <ShellHeaderTitleJob params={params} />;
      default:
        return (
          <ShellHeaderTitleHeader>
            {text}
          </ShellHeaderTitleHeader>
        );
    }
  }

  render() {
    return (
      <ShellHeaderTitleContainer>
        {this.buildHeaderText(this.props.headerText)}
      </ShellHeaderTitleContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(ShellHeaderTitle);

const ShellHeaderTitleContainer = styled.header`

`;

const ShellHeaderTitleHeader = styled.header`
  font-weight: 800;
  font-size: 30px;
`;
