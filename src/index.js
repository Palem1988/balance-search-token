import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';
import logo from './logo.svg';
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
  margin: 30px 0 15px;
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
}
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
    delay: 300
  };

  clearList = () => {
    clearTimeout(timeout);
    this.setState({ list: [] });
  };
  updateList = input => {
    const _input = input || this.state.input;
    if (timeout) clearTimeout(timeout);
    if (_input) {
      timeout = setTimeout(() => {
        this.setState({
          list: cryptoData.filter(
            crypto =>
              crypto.name.toLowerCase().match(input.toLowerCase()) ||
              crypto.symbol.toLowerCase().match(input.toLowerCase())
          )
        });
      }, this.state.delay);
    } else {
      this.setState({
        list: []
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
      <StyledColumn center={!this.state.input.length}>
        <StyledHeaderWrapper>
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
            <StyledRowWrapper>
              <StyledRow key={crypto.id}>
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
        </StyledContainer>
      </StyledColumn>
    </StyledWrapper>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
