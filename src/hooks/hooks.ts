import { useDispatch, useSelector } from 'react-redux/es';
import type { TypedUseSelectorHook } from 'react-redux/es';
import {AppDispatch, RootState} from "../store";


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
