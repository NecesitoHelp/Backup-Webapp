import React, { FC,  } from 'react';
import UserOnboardingStart from '../onboarding/start'
import UserOnboardingData from '../onboarding/data'
import UserOnboardingEnd from '../onboarding/end'
import { AppState } from '../../../types';
import { connect } from 'react-redux';


type UserOnboardingProps = 
{
    step: number,
}

const UserOnboarding: FC<UserOnboardingProps> = (props) =>{
   
    const {step} = props;

   

    return ( <>
            {step===0 && <UserOnboardingStart />}
            {step===1 && <UserOnboardingData />}
            {step===2 && <UserOnboardingEnd />}
            </> )
}

const mapStateToProps = (state: AppState)=>{
    return state
}

export default connect( mapStateToProps)(UserOnboarding);


