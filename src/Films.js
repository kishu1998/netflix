import React, { Component } from 'react';
import './App.css';
export default class Films extends Component
{
    
    renderImages(){
        let movies=this.props.movies;
        if(!movies)
        return <div>loading....</div>
        
        return movies.map((item)=>{
            return <img className='img1' key={item.trailer_url} onClick={()=>this.props.onClick(item.trailer_url)}  src={item.thumbnail}/>
        })
    }
    render()
    {
        if(this.props.movies=='') return null;
        return (<div>
                     <div style={{fontSize:'40px',color:'white'}} >
                         FILMS
                     </div>               
                     {this.renderImages()}
                    
                </div>)
    }
}
