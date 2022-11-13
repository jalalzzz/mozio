import React from "react";
import { BrowserRouter , HashRouter, Outlet, Route, Routes } from "react-router-dom";
import './layout.css'
import { connect } from "react-redux";
import { getData } from "../store/actions/dataAction";
import Store from "../store/store";
import Home from "./Home";
import Search from "./Search";





function Layout(props) {


  const store = Store;
  console.log(store.getState());
  if (store.getState().data.length === 0) props.getData();


  if (store.getState().data.length===0) {
    return (<><h1 style={{color:"red",margin:"50px"}}> Please wait 1 seconds to data</h1></>);
 
  }else{
 
    return (
  <BrowserRouter  basename="/">

<h1>loyout</h1>

        <div className="wrapper">

        <Routes>
        <Route index element={<Home />} />
        <Route path="/:name" exact element={<Search />} />
         
     
          </Routes>
        
        </div>
  
     

         </BrowserRouter>
  
  
  
  );
  }

  



//gerenalEmail




}
//export default Layout;

const mapStateToProps = (state) => {
  return { ...state };

};

export default connect(mapStateToProps, { getData })(Layout);