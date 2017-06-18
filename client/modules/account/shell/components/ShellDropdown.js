import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../../auth/ducks';
import docCookies from '../../../../utils/cookies';
import moment from 'moment';

class ShellDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    /**
     * this._isMounted is required because setState is asynchronous and cannot
     * be called on an unmounted component. That is why we're internally
     * keeping track of isMounted. If removed there will be a lot of invariant
     * errors in the console.
     * https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
     */
    this._isMounted = true;
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  /**
   * handleLogoutClick()
   * Will dispatch to the server to logout the user and at the same time
   * we will remove the JWT session cookie to unauthenticate the user.
   */
  handleLogoutClick() {
    this.props.dispatch(logout());
    docCookies.removeItem('SID');
  }

  handleClickOutside(event) {
    if (this._isMounted) {
      const domNode = ReactDOM.findDOMNode(this);

      if (!domNode || !domNode.contains(event.target)) {
        this.setState({
          showDropdown: false
        });
      } else {
        this.setState({
          showDropdown: !this.state.showDropdown
        });
      }
    }
  }

  render() {
    const { user } = this.props;

    return (
      <ShellHeaderDropdown>
        <ShellDropdownContainer showDropdown={this.state.showDropdown}>
          <ShellDropdownList>
            <ShellDropdownListItem>
              <ShellDropdownListItemTop>
                {user.firstName} {user.lastName}
              </ShellDropdownListItemTop>
              <ShellDropdownListItemBottom>
                {user.email}
              </ShellDropdownListItemBottom>
            </ShellDropdownListItem>
            <ShellDropdownListItemHr />
            <ShellDropdownListItem>
              Settings
            </ShellDropdownListItem>
            <ShellDropdownListItemHr />
            <ShellDropdownListItem onClick={this.handleLogoutClick}>
              Log out
            </ShellDropdownListItem>
          </ShellDropdownList>
        </ShellDropdownContainer>
      </ShellHeaderDropdown>
    );
  }
}

const mapStateToProps = state => ({
  user: state.session.user,
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(ShellDropdown);

const ShellHeaderDropdown = styled.nav`
  position: relative;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: ${props => props.theme.colors.pink};
  cursor: pointer;
`;

const ShellDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(99,114,130,0.16), 0 8px 16px rgba(27,39,51,0.08);
  min-width: 30px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  margin-top: -3px;
  z-index: 1;
  right: 0;
  top: 45px;
  transition: all 280ms ease;
  pointer-events: ${props => (props.showDropdown ? 'initial' : 'none')};
  opacity: ${props => (props.showDropdown ? '1' : '0')};
  transform: ${props => (props.showDropdown ? 'translate3d(0px, 0px, 0px)' : 'translate3d(0px, -10px, 0px)')};
`;

const ShellDropdownList = styled.ul`
  padding: 8px 0px;
`;

const ShellDropdownListItem = styled.li`
  list-style: none;
  padding: 12px 0px 12px 20px;

  &:last-child {
    border: none;
  }

  &:hover {
    background: #f7f9fa;
  }
`;

const ShellDropdownListItemTop = styled.div`
  font-weight: 800;
  font-size: 16px;
`;

const ShellDropdownListItemBottom = styled.div`
  margin-top: 3px;
`;

const ShellDropdownListItemHr = styled.hr`
  margin-left: 20px;
  border: none;
  height: 1px;
  background: #e6e8eb;
`;
