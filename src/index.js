import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import styled, { injectGlobal } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';
import logo from './logo.svg';
import IconPreload from './components/IconPreload';
import Form from './components/Form';
import Wrapper from './components/Wrapper';
import Input from './components/Input';
import cryptoData from './crypto.json';
import cryptoIcons from './cryptocurrency-icons';
import { colors, fonts, transitions, responsive, globalStyles } from './styles';

// eslint-disable-next-line
injectGlobal`${globalStyles}`;

const StyledColumn = styled.div`
  transition: ${transitions.long};
  width: 100%;
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-grow: 1;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  align-items: center;
  flex-direction: column;
`;

const StyledWrapper = styled(Wrapper)`
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  text-align: center;
`;

const StyledHeaderWrapper = styled.div`
  width: 100%;
  margin: ${({ center }) => (center ? '15px 0' : '30px 0 15px')};
  display: block;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBranding = styled.h1`
  font-size: ${fonts.h1};
  font-weight: 700;
  margin: 0;
  padding: 0;
  margin-left: 15px;
`;

const StyledLogo = styled.div`
  width: 50px;
  & img {
    width: 100%;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledRowWrapper = styled.div`
  display: block;
  width: 100%;
  height: 35px;
  margin: 10px 0;
  padding: 0 15px;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled.div`
  height: 35px;
  width: 35px;
  &img {
    width: 100%;
  }
`;

const StyledSymbol = styled.div`
  width: 15%;
  font-weight: 500;
  text-align: center;
  @media screen and (${responsive.sm.max}) {
    width: 30%;
  }
`;

const StyledName = styled.div`
  width: 55%;
  text-align: left;
  @media screen and (${responsive.sm.max}) {
    width: 40%;
  }
`;

const StyledResult = styled.div`
  width: 30%;
  font-weight: 500;
  text-align: right;
  color: ${({ type }) => (type === 'token' ? `rgb(${colors.green})` : `rgb(${colors.red})`)};
`;

let timeout = null;

class Root extends Component {
  state = {
    input: '',
    list: [],
    delay: 300,
    loading: false
  };

  clearList = () => {
    clearTimeout(timeout);
    this.setState({ list: [], loading: false });
  };
  updateList = input => {
    const _input = typeof input === 'string' ? input : this.state.input;
    if (timeout) {
      this.setState({ loading: false });
      clearTimeout(timeout);
    }
    this.setState({ loading: true });
    if (_input) {
      timeout = setTimeout(() => {
        const exactMatch = cryptoData.filter(
          crypto =>
            crypto.name.toLowerCase() === _input.toLowerCase() ||
            crypto.symbol.toLowerCase() === _input.toLowerCase()
        );
        const sortedExactKeys = Object.keys(exactMatch).sort(
          (a, b) => exactMatch[a].name.length - exactMatch[b].name.length
        );
        const sortedExactMatch = sortedExactKeys.map(key => exactMatch[key]);
        const startsWithRegex = new RegExp(`^${_input}`, 'gi');
        const startsWithMatch = cryptoData.filter(
          crypto =>
            crypto.name.toLowerCase().match(startsWithRegex) ||
            crypto.symbol.toLowerCase().match(startsWithRegex)
        );
        const sortedStartsWithKeys = Object.keys(startsWithMatch).sort(
          (a, b) => startsWithMatch[a].name.length - startsWithMatch[b].name.length
        );
        const sortedStartsWithMatch = sortedStartsWithKeys.map(key => startsWithMatch[key]);
        const anyMatch = cryptoData.filter(
          crypto =>
            crypto.name.toLowerCase().match(_input.toLowerCase()) ||
            crypto.symbol.toLowerCase().match(_input.toLowerCase())
        );
        const sortedAnyKeys = Object.keys(anyMatch).sort(
          (a, b) => anyMatch[a].name.length - anyMatch[b].name.length
        );
        const sortedAnyMatch = sortedAnyKeys.map(key => anyMatch[key]);
        const list = _.unionBy(sortedExactMatch, sortedStartsWithMatch, sortedAnyMatch, 'id');
        this.setState({ list, loading: false });
      }, this.state.delay);
    } else {
      this.setState({
        list: [],
        loading: false
      });
    }
  };
  onInputChange = ({ target }) => {
    this.setState({ input: target.value });
    if (target.value.length > 0) {
      this.updateList(target.value);
    } else {
      this.clearList(target.value);
    }
  };
  render = () => (
    <StyledWrapper>
      <IconPreload />
      <StyledColumn center={!this.state.input.length}>
        <StyledHeaderWrapper center={!this.state.input.length}>
          <a href="https://balance.io" target="_blank" rel="noopener noreferrer">
            <StyledHeader>
              <StyledLogo>
                <img src={logo} alt="Balance" />
              </StyledLogo>
              <StyledBranding>Balance</StyledBranding>
            </StyledHeader>
          </a>
        </StyledHeaderWrapper>
        <Form onSubmit={this.updateList}>
          <Input placeholder="Search a token" onChange={this.onInputChange} />
        </Form>
        <StyledContainer>
          {this.state.list.map(crypto => (
            <StyledRowWrapper key={crypto.id}>
              <StyledRow>
                <StyledIcon>
                  <img
                    src={
                      cryptoIcons[crypto.symbol.toLowerCase()] ||
                      (crypto.type === 'token' ? cryptoIcons['erc20'] : cryptoIcons['coin'])
                    }
                    alt={crypto.symbol}
                  />
                </StyledIcon>
                <StyledSymbol>{crypto.symbol}</StyledSymbol>
                <StyledName>{crypto.name}</StyledName>
                <StyledResult type={crypto.type}>
                  {crypto.type === 'token' ? `${crypto.network} Token` : 'Coin'}
                </StyledResult>
              </StyledRow>
            </StyledRowWrapper>
          ))}
          {!!this.state.input &&
            !this.state.list.length &&
            !this.state.loading && (
              <StyledRowWrapper>
                <StyledEmpty>{`Can't find that one`}</StyledEmpty>
              </StyledRowWrapper>
            )}
        </StyledContainer>
      </StyledColumn>
    </StyledWrapper>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
