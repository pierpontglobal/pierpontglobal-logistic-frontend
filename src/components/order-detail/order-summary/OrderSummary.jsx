import React, { Component } from 'react';
import styled from 'styled-components';

const SummaryWrapper = styled.div`
  width: 100%;
  margin: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 280px;
  overflow-y: scroll;
  -webkit-box-shadow: 6px -6px 12px -12px rgba(0, 0, 0, 0.73);
  -moz-box-shadow: 6px -6px 12px -12px rgba(0, 0, 0, 0.73);
  box-shadow: 6px -6px 12px -12px rgba(0, 0, 0, 0.73);
  border-radius: 25px;
  margin-top: 50px;
`;

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pcs: 11,
      weight: 1000,
      volume: 0,
      volWeight: 0,
      income: 1515,
      expense: 606,
      profit: 909
    };
  }

  componentDidMount = () => {
    // Get order summary info and override the sample in the state
  };

  render() {
    const {
      pcs,
      weight,
      volWeight,
      volume,
      income,
      expense,
      profit
    } = this.state;
    return (
      <>
        <SummaryWrapper>
          <div style={{ width: '100%', marginBottom: '15px' }}>
            <span
              style={{ fontSize: '1.25rem', color: 'black', padding: '10px' }}
            >
              Summary{' '}
            </span>
          </div>
          <div
            style={{
              padding: '15px',
              borderRadius: '10px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '18px'
              }}
            >
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>PCs</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{pcs}</span>
                </div>
              </div>
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>Weight</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{weight}</span>
                </div>
              </div>
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>Volumne</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{volume}</span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '18px'
              }}
            >
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>volWeight</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{volWeight}</span>
                </div>
              </div>
            </div>
            <hr />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '18px'
              }}
            >
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>Income</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{income}</span>
                </div>
              </div>
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>Expense</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{expense}</span>
                </div>
              </div>
              <div>
                <div>
                  <span style={{ fontWeight: '600' }}>Profit</span>
                </div>
                <div>
                  <span style={{ fontStyle: 'italic' }}>{profit}</span>
                </div>
              </div>
            </div>
          </div>
        </SummaryWrapper>
      </>
    );
  }
}

export default OrderSummary;
