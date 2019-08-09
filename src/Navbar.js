import React, { Component } from 'react'
import App from './App';
import './App.css';
import {Link} from 'react-router-dom';
import logo from './logo.png'
export default class Navbar extends Component {
    render() {
        let header = document.getElementById("myDIV");
        let btns = document.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
  });
}
        return (
            <div id="myDIV" className='container'>
                
                    <li className="logo" ><Link to='/'><img src={logo} style={{width:'7vw',height:'4vh'}}></img></Link></li>
                    
                    <li className="btn side" ><Link to='/films'>FI LMS</Link></li>
                    <li className="btn side"><Link to='/series'>SERI ES</Link></li>
                    <li className="btn active side"><Link to='/'>HOME</Link></li>
                    <li className="side"><input  onInput={(e)=>this.props.onChange(e.target.value)} placeholder="search" ></input></li>
                
            </div>
        )
    }
}
