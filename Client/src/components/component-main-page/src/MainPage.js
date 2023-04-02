import './MainPage.css'
import MessagePart from '../../component-messagePart/src/MessagePart'
import CardPart from '../../component-cardPart/src/CardPart'
import Feed from '../../components.feed/feed'
import MenuIcon from '@mui/icons-material/Menu';
import Community from '../../components.feed/main'
import { useState } from 'react'
import Waves from '../../component-cardPart/src/Waves'
import { RiCommunityFill } from 'react-icons/ri';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
// import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
// import {useDispatch} from "react-redux";
// import {addToSet} from "../../../actions/action1";

const MainPage=()=>{
    // const dispatch = useDispatch();

    // const { user, isAuthenticated } = useSelector(
    //     (state) => state.user
    //   );

    //   console.log(user);

    //   console.log(isAuthenticated);


    const [activeParts,setActivePart]=useState(false)
    // console.log(activeParts);
    const slidingMessageWindow=()=>{
        document.getElementById('message-container').classList.add('slideWindow')
        // console.log("1");
    }
    const [toggleCardMode,setToggleCardMode]=useState(true);

    // dispatch(addToSet(popupActive));
    const handleToggle=()=>{
        if(toggleCardMode){
            setToggleCardMode(false)
        }
        else{
            setToggleCardMode(true)
        }
    }
    const [activeSetting,setActiveSetting]=useState(false);
    const changeSettingState=(currentState)=>{
        if(currentState){
            setActiveSetting(false);
        }
        else{
            setActiveSetting(true);
        }
    }
    return(
            <div className="mainPage-container">
                {/* <MessagePart setActivePart={setActivePart} activeParts={activeParts}/>
                <CardPart/> */}
                {/* hello */}
                <div className='mainPage-header'>
                    <button className='menuBtn' onClick={slidingMessageWindow}><MenuIcon/></button><h4>MentoShala</h4>
                    <div className='headerBtn'>
                    <button className='cardToCommunity' onClick={handleToggle}><ModeCommentIcon/></button>
                    <button className='cardTosetting' onClick={()=>{changeSettingState(activeSetting)}}><SettingsIcon/></button>
                   
                    </div>
                   

                </div>
                <div className='contentDiv'>
                    {/* <MessagePart setActivePart={setActivePart} activeParts={activeParts}/> */}
                    {/* <CardPart/> */}
                    <MessagePart settingState={activeSetting}/>
                    {toggleCardMode?<CardPart/>:<Community/>}
                    
                </div>
            </div>
    )
}
export default MainPage