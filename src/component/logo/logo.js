import React from 'react'
import logoImg from './job.png'
import './logo.css'//Only .js can be ignored, you can not do: import 'logo';
class Logo extends React.Component {
  render() {
    return (
      <div class="logo-container">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo
