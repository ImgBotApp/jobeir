// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { browserHistory, Link } from 'react-router';
// import { switchCompany } from '../../../user/ducks/';
import { ChevronDown } from '../../../../../icons/';

class JobPostingOptionsButton extends Component {
  state: {
    showDropdown: boolean
  };

  constructor(props) {
    super(props);
    this.state = { showDropdown: false };
  }

  componentDidMount() {
    /**
     * this.mounted is required because setState is asynchronous and cannot
     * be called on an unmounted component. That is why we're internally
     * keeping track of isMounted. If removed there will be a lot of invariant
     * errors in the console.
     * https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
     */
    this.mounted = true;
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = event => {
    if (this.mounted) {
      const domNode = ReactDOM.findDOMNode(this);

      if (!domNode || !domNode.contains(event.target)) {
        this.setState({ showDropdown: false });
      } else {
        this.setState({ showDropdown: !this.state.showDropdown });
      }
    }
  };

  render() {
    const { companies, user } = this.props;

    return (
      <ShellHeaderDropdown>
        <ShellSidebarCompany>
          Options
          <StlyedChevronDown />
        </ShellSidebarCompany>
        <JobPostingOptionsButtonContainer
          showDropdown={this.state.showDropdown}
        >
          <ul>
            <ShellHeaderDropdownLinks>
              <div onClick={() => browserHistory.push('/create/company/about')}>
                <JobPostingOptionsButtonListItem>
                  Share Link
                </JobPostingOptionsButtonListItem>
              </div>
              <div onClick={() => browserHistory.push('/create/company/about')}>
                <JobPostingOptionsButtonListItem>
                  Unpublish
                </JobPostingOptionsButtonListItem>
              </div>
              <JobPostingOptionsListItemHr />
              <div onClick={() => browserHistory.push('/create/company/about')}>
                <JobPostingOptionsButtonListItem>
                  Delete
                </JobPostingOptionsButtonListItem>
              </div>
            </ShellHeaderDropdownLinks>
          </ul>
        </JobPostingOptionsButtonContainer>
      </ShellHeaderDropdown>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.account.companies,
  user: state.session.user
});

export default connect(mapStateToProps)(JobPostingOptionsButton);

const ShellHeaderDropdown = styled.div`position: relative;`;

const ShellSidebarCompany = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const StlyedChevronDown = styled(ChevronDown)`
  fill: ${props => props.theme.colors.black};
  height: 16px;
  bottom: 2px;
  position: relative;
`;

const ShellHeaderDropdownLinks = styled.div`opacity: 0.7;`;

const JobPostingOptionsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  width: 180px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16),
    0 8px 16px rgba(27, 39, 51, 0.08);
  transform: translateZ(0);
  margin-top: 5px;
  padding: 4px 0;
  z-index: 1;
  right: 0px;
  top: 30px;
  transition: all 280ms ease;
  pointer-events: ${props => (props.showDropdown ? 'initial' : 'none')};
  opacity: ${props => (props.showDropdown ? '1' : '0')};
  transform: ${props =>
    props.showDropdown
      ? 'translate3d(0px, 0px, 0px)'
      : 'translate3d(0px, -10px, 0px)'};
`;

const JobPostingOptionsButtonList = styled.ul``;

const JobPostingOptionsButtonListItem = styled.li`
  position: relative;
  list-style: none;
  padding: 12px 25px 9px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  background: ${props => (props.isActive ? 'rgba(92, 106, 196, 0.1)' : '#fff')};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    height: 100%;
    background: ${props =>
      props.isActive ? props.theme.colors.purple : '#fff'};
  }

  &:last-child {
    border: none;
  }
`;

const JobPostingOptionsListItemHr = styled.hr`
  border: none;
  height: 1px;
  background: #f1f0f0;
`;
