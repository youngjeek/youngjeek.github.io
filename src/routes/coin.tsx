// import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from './api';
// interface//
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
interface RouteState {
  name: string;
}
//Style Components
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
  background-color: ${(props) => props.theme.btnColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 5px;
`;
const DataItem = styled.span`
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
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  margin: 20px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive?: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.btnColor};
  padding: 10px 0;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const Description = styled.p`
  margin: 30px 0px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Button = styled.button``;

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch(`/${coinId}/price`);
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 50000000 }
  );
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //       ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //       ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || tickersLoading;
  return (
    <>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Title>
            {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <DataBox>
              <DataItem>
                <span>Rank</span>
                <span>{infoData?.rank}</span>
              </DataItem>
              <DataItem>
                <span>Symbol</span>
                <span>${infoData?.symbol}</span>
              </DataItem>
              <DataItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
              </DataItem>
            </DataBox>
            <Description>{infoData?.description}</Description>
            <DataBox>
              <DataItem>
                <span>Total:</span>
                <span>{tickersData?.total_supply}</span>
              </DataItem>
              <DataItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </DataItem>
            </DataBox>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
              <Tab isActive={false}>
                <Link to={`/${coinId}/something`}>Something</Link>
              </Tab>
            </Tabs>
            <Switch>
              <Route path={`/${coinId}/price`}>
                <Price />
              </Route>
            </Switch>
            <Switch>
              <Route path={`/${coinId}/chart`}>
                <Chart coinId={coinId} />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
}

export default Coin;
