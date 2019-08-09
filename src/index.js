
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';
import Navbar from './Navbar';
import {BrowserRouter as Router} from 'react-router-dom';
import {Switch,Route} from 'react-router-dom';
import Films from './Films';
import Series from './Series';
import Default from './Default';

class Main extends Component {
   constructor()
   { 
       super();
       this.state={
        f_movies:null,
        f_series:null,
        movies:null,
        series:null,
        current:null,
        search:''
        }
        // this.onChangeHandler=this.onChangeHandler.bind(this);
    }
    componentDidMount()
    {
        fetch('https://api.myjson.com/bins/zcb6t').then(response => response.json()).then(resData =>
         {
             
             this.setState({movies:resData,f_movies: resData,current:resData[Math.floor(Math.random() * 10)]});
            
        });
        fetch(' https://api.myjson.com/bins/1f953p').then(response => response.json()).then(resData =>
         {
             
             this.setState({series:resData,f_series: resData});
            
        });
    }
    renderImages()
    {
        let movies=this.state.movies;
        if(!movies)
        return <div>loading....</div>
        return movies.map((item)=>{
            return <img style={{width:'10vw',height:'15vh'}} src={item.thumbnail}/>
        })
    }
    ratings()
    { let a=[];
    let i=0;
    a.push(<h3 key='yj' style={{color:'white'}}>RATINGS </h3>)
    for(i=0;i<this.state.current.rating;i++)
       a.push(<span key={i} style={{color:'yellow'}}>☆</span>)
    for(let j=i;j<10;j++)
        a.push(<span key={j} style={{color:'white'}}>☆</span>)
       return a;
    }

    renderVideo = () => {
        
        let movie = this.state.movies;
        if(!movie)
            return <div>Loading....</div>
        return (<div id="video-player">
                <center>
                    <iframe  src={this.state.current.trailer_url} style={{marginTop:'8vh',width: '100%', height: '60vh'}} ></iframe>
                </center>
                <h1 style={{color:"white"}}>{this.state.current.title}</h1>
                <div style={{width:'100%',height:"200px",color:'white',fontFamily:'thunderstrike3d'}}>
                
                {this.state.current.description}
                <div> {this.ratings()}</div>

                </div>
            
            </div>
        )
    }
    onChangeHandler(val)
    {
        
        let movies=this.state.f_movies;
        let series=this.state.f_series;
        let movies1=movies.filter((item)=>(item.title).toLowerCase().includes(val.toLowerCase()));
        let series1=series.filter((item)=>(item.title).toLowerCase().includes(val.toLowerCase()));

        this.setState({movies:movies1,series:series1,search:val});
        document.getElementById("scroll").scrollIntoView();
    }
    setCurrentByNav(type)
    {
        if(type=='f')
        this.setCurrent(this.state.f_movies[Math.floor(Math.random() * 10)])
       else this.setCurrent(this.state.f_series[Math.floor(Math.random() * 10)])
    }
    currentlyViewed()
    {

    }
     setCurrent(i)
     {
         this.setState({current:i});
          document.getElementById("video-player").scrollIntoView();
    
         let b=[];
        let a=localStorage.getItem('netflix');
        if(a)
        {console.log(a);
            b.push(a);
        }
        localStorage.clear();
        localStorage.setItem('netflix',i.thumbnail);
     }

    render() {
        
        return (
            <div>
                 
                <Navbar onClick={(f_s)=>this.setCurrentByNav(f_s)} onChange={(val)=>this.onChangeHandler(val)}> 
                   
                     
                </Navbar>
                        {this.renderVideo()}
                <div id="scroll">
                <Switch>
                    <Route exact path='/netflix/'  component={()=><Default movies={this.state.movies} series={this.state.series} onClick={(i)=>this.setCurrent(i)}  />} ></Route>
                    <Route  path='/films'  component={()=><Films movies={this.state.movies} onClick={(i)=>this.setCurrent(i)} />}></Route>
                    <Route  path='/series' component={()=><Series series={this.state.series} onClick={(i)=>this.setCurrent(i)}  />} ></Route>
                   
                </Switch>
                </div>
                        {this.currentlyViewed()}
                <div className="footer" >Media source: Google/YouTube. Not intended for commercial use. May subject to copyright.</div>
             </div> 
        )
    }
}


ReactDOM.render(<Router><Main /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
