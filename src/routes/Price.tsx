import styled from 'styled-components';

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
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
function Price() {
  return (
    <Tabs>
      <Tab></Tab>
      <Tab></Tab>
      <Tab></Tab>
    </Tabs>
  );
}

export default Price;
