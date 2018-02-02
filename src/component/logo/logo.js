import React from 'react'
import './logo.css'//Only .js can be ignored, you can not do: import 'logo';
class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={require(`./job.png`)} alt=""/>
      </div>
    )
  }
}

export default Logo
