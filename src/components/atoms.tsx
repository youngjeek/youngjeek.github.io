import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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
    const category = get(categoryList);
    return [
      toDos.filter((toDo) => toDo.category === Categories.NOT_YET),
      toDos.filter((toDo) => toDo.category === Categories.ACTIVE),
      toDos.filter((toDo) => toDo.category === Categories.DONE),
      toDos.filter((toDo) =>
        Object.keys(category).includes(toDo.category as string)
      ),
    ];
  },
});
// (toDo) => Object.keys(categoryList).includes('ㅁㅁ')
