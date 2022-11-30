import React, { FC } from 'react';
import HelperOnboardingStart from './start/index';
import HelperOnboardingData from './data/index';
import HelperOnboardingEnd from './end/index';
import { HelperAppState } from '../../../types';
import { connect } from 'react-redux';


type HelperOnboardingProps = 
{
    step: number,
}

const HelperOnboarding: FC<HelperOnboardingProps> = (props) =>{
   
    const {step} = props;
    

    return (<>
        {step===0 && <HelperOnboardingStart />}
        {step===1 && <HelperOnboardingData />}
        {step===2 && <HelperOnboardingEnd />}
        </> )             
}

const mapStateToProps = (state: HelperAppState)=>{
    return state
}

export default connect( mapStateToProps)(HelperOnboarding);