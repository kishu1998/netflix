import React, { Component } from 'react';
import Films from './Films';
import Series from './Series';
export default class Default extends Component
{
    hi(i)
    {
            console.log(i);
    }
    render()
    {
        return (
                <div>
                    <Films movies={this.props.movies} onClick={(i)=>this.props.onClick(i)} />
                    <Series series={this.props.series} onClick={(i)=>this.props.onClick(i)} />
                </div>)
    }
}
