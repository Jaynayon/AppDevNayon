import React, { Component, useState } from 'react';
import UniversityService from './UniversityService';

class ReadUniversity extends React.Component{
    state = {
        uni : []
    }

    componentDidMount(){
        UniversityService.getUniversities().then((res) => {
            this.setState({uni: res.data});
        });
    }

    render() {
        return (
            <ul>
                {this.state.uni.map(uni => 
                <>
                <li>Id: {uni.id}</li>
                <li>Name: {uni.name}</li>
                </>
                )}
                
            </ul>
        );
    }
}

export default ReadUniversity;