import React, { Component } from 'react';
import './App.css';
export default class Films extends Component
{
    
    renderImages(){
        let movies=this.props.movies;
        if(!movies)
        return <div>loading....</div>
        
        return movies.map((item)=>{
            return (<li key={item.trailer_url} style={{display:'inline'}}>
                        <img className="img1"  onClick={()=>this.props.onClick(item)}  src={item.thumbnail} />
                        
                    </li>);
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
