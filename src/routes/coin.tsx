import { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';

interface RouteParams {
  coinId: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

const Container = styled.div`
  padding: 0px 20px;
  max-width: 500px;

  margin: 0px auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 28px;
  color: ${(props) => props.theme.accentColor};
`;
const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
`;
const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 30px 0px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
interface RouteState {
  name: string;
}
function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <DataBox>
            <DataItem>
              <span>Rank</span>
              <span>{info?.rank}</span>
            </DataItem>
            <DataItem>
              <span>Symbol</span>
              <span>${info?.symbol}</span>
            </DataItem>
            <DataItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? 'Yes' : 'No'}</span>
            </DataItem>
          </DataBox>
          <Description>{info?.description}</Description>
          <DataBox>
            <DataItem>
              <span>Total:</span>
              <span>{priceInfo?.total_supply}</span>
            </DataItem>
            <DataItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </DataItem>
          </DataBox>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
          </Switch>
          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
