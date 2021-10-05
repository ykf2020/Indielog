import { useState } from 'react'
import SignUp from './SignUp.js'
import SignIn from './SignIn.js'
import ForgetPassword from './ForgetPassword.js'
import {
  SignPanelContainer,
  SignPanelLogo,
  Panel,
  CancelButton,
  PanelInnerWrap,
} from './SignPanelElements.js'
const SignPanel = ({ toggleSignPanel }) => {
  const [panelStatus, setPanelStatus] = useState("signup")
  return (
      <SignPanelContainer>
        <Panel>
          <CancelButton onClick={toggleSignPanel} />
          <SignPanelLogo>Indielog</SignPanelLogo>
          <PanelInnerWrap>
          { panelStatus === 'signup' && <SignUp setPanelStatus={setPanelStatus} toggleSignPanel={toggleSignPanel}/>}
          { panelStatus === 'signin' && <SignIn setPanelStatus={setPanelStatus} toggleSignPanel={toggleSignPanel}/>}
          { panelStatus === 'forget' && <ForgetPassword setPanelStatus={setPanelStatus} toggleSignPanel={toggleSignPanel}/>}
          </PanelInnerWrap>
        </Panel>
      </SignPanelContainer>
  )
}

export default SignPanel
