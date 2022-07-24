import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { AppActionsType, AppStateType, DispatchThunkType } from "../redux/store";

export const useTypedDispatch: () => DispatchThunkType = useDispatch
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector