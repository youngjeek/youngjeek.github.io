import { atom } from 'recoil';

export interface IToDo {
  text: string;
  id: number;
  category: 'NOT_YET' | 'ACTIVE' | 'DONE';
}
export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});
