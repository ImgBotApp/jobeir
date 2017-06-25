import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { browserHistory, Link } from 'react-router';
import { switchCompany } from '../../../user/ducks/';
import { ChevronDown } from '../../../../icons/';

class SidebarLinksDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropdown: false };
    this.switchCompanies = this.switchCompanies.bind(this);
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

  handleClickOutside(event) {
    if (this._isMounted) {
      const domNode = ReactDOM.findDOMNode(this);

      if (!domNode || !domNode.contains(event.target)) {
        this.setState({ showDropdown: false });
      } else {
        this.setState({ showDropdown: !this.state.showDropdown });
      }
    }
  }

  switchCompanies(company) {
    const { dispatch, user } = this.props;
    const data = {
      activeCompany: {
        name: company.name,
        displayName: company.displayName
      }
    };

    dispatch(switchCompany(data, user._id));
  }

  render() {
    const { companies } = this.props;

    return (
      <DropdownNavContainer>
        <DropdownNavButton>
          {companies.activeCompany.displayName} <ChevronDown />
        </DropdownNavButton>
        <DropdownNavDropdown showDropdown={this.state.showDropdown}>
          <DropdownNavDropdownList>
            {companies.created
              .filter(company => company.name !== companies.activeCompany.name)
              .map(company =>
                <div
                  key={company._id}
                  onClick={() => this.switchCompanies(company)}
                >
                  <DropdownNavDropdownListItem>
                    {company.displayName}
                  </DropdownNavDropdownListItem>
                  <DropdownNavDropdownListHr />
                </div>
              )}
            <div onClick={() => browserHistory.push('/create/company/about')}>
              <DropdownNavDropdownListItem>
                + Create new
              </DropdownNavDropdownListItem>
            </div>
          </DropdownNavDropdownList>
        </DropdownNavDropdown>
      </DropdownNavContainer>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  user: state.session.user
});

export default connect(mapStateToProps)(SidebarLinksDropdown);

const DropdownNavContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const DropdownNavButton = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 16px;
  text-decoration: none;
  height: 40px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => (props.company ? '15px' : '0px')};

  &:last-child {
    padding-right: 13px;
  }

  &.route-active {
    color: ${props => props.theme.colors.red};
    font-weight: 600;
  }

  svg {
    padding: 3px;
    position: relative;
    top: -1px;
    fill: rgba(0,0,0,0.85);
  }
`;

const DropdownNavDropdown = styled.div`
  position: absolute;
  background-color: #fff;
  min-width: 220px;
  border-radius: 3px;
  box-shadow: 0 0 0 1px rgba(99,114,130,0.16), 0 8px 16px rgba(27,39,51,0.08);
  transition: all 280ms ease;
  pointer-events: ${props => (props.showDropdown ? 'initial' : 'none')};
  opacity: ${props => (props.showDropdown ? '1' : '0')};
  transform: ${props =>
    props.showDropdown
      ? 'translate3d(0px, 0px, 0px)'
      : 'translate3d(0px, -10px, 0px)'};
`;

const DropdownNavDropdownList = styled.ul`
  padding: 4px 0px;
`;

const DropdownNavDropdownListItem = styled.li`
  list-style: none;
  padding: 12px 20px 10px;

  &:hover {
    background: #f7f9fa;
  }
`;

const DropdownNavDropdownListHr = styled.hr`
  margin-left: 20px;
  border: none;
  height: 1px;
  background: #e6e8eb;

`;
