import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import JobFormStepOne from './JobFormStepOne';
import JobFormStepTwo from './JobFormStepTwo';
import JobFormStepThree from './JobFormStepThree';

class JobForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { page } = this.state

    return (
      <div>
        {page === 1 && <JobFormStepOne nextPage={this.nextPage}/>}
        {page === 2 && <JobFormStepTwo previousPage={this.previousPage} nextPage={this.nextPage}/>}
        {page === 3 && <JobFormStepThree previousPage={this.previousPage} />}
      </div>
    )
  }
}

export default JobForm
