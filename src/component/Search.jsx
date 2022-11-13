import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";
import { getData } from "../store/actions/dataAction";
import Store from "../store/store";
import "react-widgets/styles.css";

import Combobox from "react-widgets/Combobox";
import DatePicker from "react-widgets/DatePicker";
import "./search.css";
const Search = () => {
    const store = Store;
    const [cities, setCities] = useState([]);
    const[paramName,setParamName]=useState(window.location.pathname.split('/').join(""));
    const[data,setData]=useState([]);
  




    useEffect(() => {
        if (store.getState().data.data.length === 0) props.getData();
        else {
            console.log(store.getState().data.data);
         
            const newData = store.getState().data.data.map((item) => { return { name: item[0],lat:item[1],long:item[2], id: item[3] } })
            setCities([...newData]);
            console.log(newData)


        }

    }, [])
    useEffect(() => {
        const perChunk = 4 ;

        const inputArray = paramName.split(',')
        
        const result = inputArray.reduce((resultArray, item, index) => { 
          const chunkIndex = Math.floor(index/perChunk);
        
          if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
          }
        
          resultArray[chunkIndex].push(item);
        
          return resultArray
        }, []);
        setData(result);

    }, []);
    const calcCrow=(lat1, lon1, lat2, lon2) =>
    {
        console.log(lat1,lat2,lon1,lon2)
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    const toRad=(Value) =>
    {
        return Value * Math.PI / 180;
    }
    let totalDis=0;

    return (
        <>
           <h1>Search</h1>
            {data.length > 0 ? <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>from</th>
                            <th>to</th>
                            <th>date</th>
                            <th>passengers</th>
                            <th>distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                    
                        data.map((item, index) => {

                      const city1=cities.filter(city=>city.id== item[0])[0];
                      const city2=cities.filter(city=>city.id== item[1])[0];
                      console.log(city1)
                      console.log(city2)
                      const distance=calcCrow(city1.lat,city1.long,city2.lat,city2.long).toFixed(2)  
                      totalDis+=distance*1;    
                       
                        
                        const sameAsBigDay = new Date();
                        sameAsBigDay.setTime(item[2]);
                      
                            return (
                                <tr key={index}>
                                    <td> {city1.name}</td>
                                    <td>{city2.name}</td>
                                    <td>{sameAsBigDay.toLocaleDateString()}</td>
                                    <td>{item[3]}</td>
                                    <td>{distance}</td>
                                </tr>

                            )


                        })}
                          <tr >
                                    <td> Total</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{totalDis.toFixed(2)}</td>
                                </tr>
                    </tbody>

                </table>

   
             

                    </div> : null}


        </>


    );
};

const mapStateToProps = (state) => {
    return { ...state };

};

export default connect(mapStateToProps, { getData })(Search);