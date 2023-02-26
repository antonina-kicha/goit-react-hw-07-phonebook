import { Label, Input } from './Filter.styled';
import { useDispatch } from "react-redux";
import { setStatusFilter } from "redux/filterSlice.jsx";


export const Filter = () => {
    const dispatch = useDispatch();
    
    const changeFilter = (evt) => {
        dispatch(setStatusFilter(evt.currentTarget.value));
  }
    
    return (
            <Label >Find contacts by name
                <Input type="text" onChange={changeFilter}/>
            </Label>  
        )
    }
