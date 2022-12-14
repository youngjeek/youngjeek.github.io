import styled from 'styled-components';
import { fetchCoinTickers } from './api';
import { useQuery } from 'react-query';
interface IPriceProps {
  coinId: string;
}
interface IQuotes {
  USD: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: IQuotes;
}
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  margin: 20px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  background-color: ${(props) => props.theme.btnColor};
  padding: 10px 0;
  border-radius: 10px;
  span:first-child {
    color: ${(props) => props.theme.accentColor};
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 50000000 }
  );
  const priceDetail = data?.quotes.USD;
  function plusminus(num: number) {
    return num > 0 ? `${num}` : `-${num}`;
  }
  return (
    <>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <Tabs>
          <Tab>
            <span>시가총액</span>
            <hr />
            <span>{priceDetail?.market_cap.toFixed(0)}</span>
          </Tab>
          <Tab>
            <span>시가총액 in 24h</span>
            <hr />
            <span>
              {plusminus(priceDetail?.market_cap_change_24h as number)}%
            </span>
          </Tab>
          <Tab>
            <span>1H</span>
            <hr />
            <span>{priceDetail?.percent_change_1h.toFixed(2)}%</span>
          </Tab>
          <Tab>
            <span>1W</span>
            <hr />
            <span>{priceDetail?.percent_change_7d.toFixed(2)}%</span>
          </Tab>
          <Tab>
            <span>최고가</span>
            <hr />
            <span>{priceDetail?.ath_date}</span>
          </Tab>
          <Tab>
            <span>최고가 대비 현재</span>
            <hr />
            <span>{priceDetail?.percent_from_price_ath}%</span>
          </Tab>
        </Tabs>
      )}
    </>
  );
}

export default Price;
