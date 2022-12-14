import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import styled from 'styled-components';

export enum Categories {
  'NOT_YET' = 'NOT_YET',
  'ACTIVE' = 'ACTIVE',
  'DONE' = 'DONE',
}
export interface ICustomCategory {}
export interface IToDo {
  text: string;
  id: number;
  category: Categories | ICustomCategory;
}
export const categoryState = atom({
  key: 'category',
  default: Categories.NOT_YET,
});
const { persistAtom } = recoilPersist({
  key: 'to-doData',
  storage: localStorage,
});
export const categoryList = atom<ICustomCategory[]>({
  key: 'newCategory',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//atom(just give u arr) output transform ~controller
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const newCategory = get(categoryList);
    return [
      toDos.filter((toDo) => toDo.category === Categories.NOT_YET),
      toDos.filter((toDo) => toDo.category === Categories.ACTIVE),
      toDos.filter((toDo) => toDo.category === Categories.DONE),
      toDos.filter((toDo) =>
        Object.keys(newCategory).includes(toDo.category as string)
      ),
    ];
  },
});

export const Button = styled.button`
  color: black;
  background-color: ${(props) => props.theme.accentColor};
  border: 0;
  margin: 2px 2px;
  padding: 2px 10px;
  border-radius: 5px;
`;
export const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 5px;
`;
export const Tab = styled.div<{ isActive?: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.btnColor};
  padding: 10px 0;
  border-radius: 10px;
  margin: 2px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
export const Div2 = styled(Div)`
  grid-template-columns: repeat(1, 2fr);
`;
