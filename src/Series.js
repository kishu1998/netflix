import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
class Series extends Component
{
    renderImages(){
        let series=this.props.series;
        if(!series)
        return <div>loading....</div>
        return series.map((item)=>{
            return <img className="img1" key={item.id} onClick={()=>this.props.onClick(item.trailer_url)}  src={item.thumbnail}/>
        })
    }
    render()
    {
        if(this.props.series=='') return null;
        return (<div>
                    <div style={{fontSize:'40px',color:'white'}} >SERIES</div>
                    {this.renderImages()}
                    
                </div>)
    }
}


export default Series;