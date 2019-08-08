
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
        fetch('https://api.myjson.com/bins/13i70t').then(response => response.json()).then(resData =>
         {
             
             this.setState({movies:resData,f_movies: resData,current:resData[Math.floor(Math.random() * 10)].trailer_url});
            
        });
        fetch('https://api.myjson.com/bins/s4td9').then(response => response.json()).then(resData =>
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

    renderVideo = () => {
        
        let movie = this.state.movies;
        if(!movie)
            return <div>Loading....</div>
        return (
            <center ><iframe  src={this.state.current} style={{marginTop:'60px',width: '100%', height: '60vh'}} ></iframe></center>
        )
    }
    onChangeHandler(val)
    {
        console.log(val)
        let movies=this.state.f_movies;
        let series=this.state.f_series;
        let movies1=movies.filter((item)=>(item.title).toLowerCase().includes(val.toLowerCase()));
        let series1=series.filter((item)=>(item.title).toLowerCase().includes(val.toLowerCase()));

        this.setState({movies:movies1,series:series1,search:val});

    }
     setCurrent(i)
     {
         this.setState({current:i});
     }

    render() {
        
        return (
            <div>
                 
                <Navbar onChange={(val)=>this.onChangeHandler(val)}> 
                   
                     
                </Navbar>
                {this.renderVideo()}
                <Switch>
                    <Route exact path='/'  component={()=><Default movies={this.state.movies} series={this.state.series} onClick={(i)=>this.setCurrent(i)}  />} ></Route>
                    <Route  path='/films'  component={()=><Films movies={this.state.movies} onClick={(i)=>this.setCurrent(i)} />}></Route>
                    <Route  path='/series' component={()=><Series series={this.state.series} onClick={(i)=>this.setCurrent(i)}  />} ></Route>
                   
                </Switch>
                
             </div> 
        )
    }
}


ReactDOM.render(<Router><Main /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
