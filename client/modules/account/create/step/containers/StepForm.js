// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import CompanyOnboarding from '../../company/components/CompanyOnboarding';

/**
 * The process for posting a new job
 * We need to check if there's already a company associated
 * with the current user. If not, we will ask them to create
 * a new company and then post a job
 */
class StepForm extends Component {
  state: {
    asyncComponent: ''
  };

  constructor(props) {
    super(props);
    this.state = { asyncComponent: '' };
  }

  componentDidMount() {
    this.importUtil(this.props.params.create);
  }

  /* *
 * When a new tab is clicked on run asyncLoadComponetTab() to
 * asynchronously import the correct component.
 */
  componentWillUpdate(nextProps) {
    const { params } = this.props;
    if (nextProps.params.create !== params.create) {
      this.importUtil(nextProps.params.create);
    }
  }

  importUtil(create) {
    if (create === 'job') {
      require.ensure(
        [`../../../../user-input/forms/form/job/JobForm`],
        require => {
          // Now require it "sync"
          const asyncComponent = require(`../../../../user-input/forms/form/job/JobForm`)
            .default;
          this.setState({ asyncComponent });
        },
        'job-form'
      );
    } else {
      require.ensure(
        [`../../../../user-input/forms/form/company/CompanyForm`],
        require => {
          // Now require it "sync"
          const asyncComponent = require(`../../../../user-input/forms/form/company/CompanyForm`)
            .default;
          this.setState({ asyncComponent });
        },
        'company-form'
      );
    }
  }

  render() {
    const { params } = this.props;
    const isCompany = params.create === 'company';
    const AsyncComponent = this.state.asyncComponent;

    return (
      <StepFormContainer>
        {isCompany && params.step === 'onboarding' && <CompanyOnboarding />}
        {AsyncComponent && <AsyncComponent params={params} />}
      </StepFormContainer>
    );
  }
}

export default StepForm;

const StepFormContainer = styled.div`width: 52.5%;`;
