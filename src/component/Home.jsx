import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../store/actions/dataAction";
import Store from "../store/store";
import "react-widgets/styles.css";

import Combobox from "react-widgets/Combobox";
import DatePicker from "react-widgets/DatePicker";
import "./home.css";
const Home = () => {
    const store = Store;
    const [cities, setCities] = useState([]);
    const [fromCity, setFromCity] = useState(null);
    const [toCity, setToCity] = useState(null);
    const [dateTrip, setDateTrip] = useState(null);
    const [passengers, setPassengers] = useState(1);
    const [minDate, setMinDate] = useState(new Date());
    const formEl = useRef(null);
    const [trip, setTrip] = useState([]);


    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        console.log(trip.flat(Infinity))

        const newArray=trip.flat(Infinity).map(item=>{
            console.log(item)
            if(item.id!=null){
                return item.id;
            }else{
                return item;
           
            }
        });
        console.log(newArray)

      let path = newArray.join(","); 
      navigate(path);
    }

    useEffect(() => {
        if (store.getState().data.data.length === 0) props.getData();
        else {
            console.log(store.getState().data.data)
            const newData = store.getState().data.data.map((item) => { return { name: item[0], id: item[3] } })
            setCities([...newData]);



        }

    }, [])
    const onHanderNewTrip = () => {
        setTrip(prev => [...prev, [fromCity, toCity, new Date(dateTrip).getTime(), passengers]]);
        setMinDate(dateTrip);
        setFromCity(toCity);
        setToCity(null);
        setDateTrip(null);
        setPassengers(1);
        console.log(trip)

    }
    const onHanderRemoveTrip=()=>{
        const remainingItems = trip.filter((item,index) => {return index !==trip.length-1});
      
        if(remainingItems.length>0){
            setMinDate(new Date(remainingItems[remainingItems.length-1][2]));
            setFromCity(remainingItems[remainingItems.length-1][1]);
        }else{
            setMinDate(new Date());
            setFromCity(null);
          
        }
        setToCity(null);
        setDateTrip(null);
        setPassengers(1);
        setTrip(remainingItems);
    }

    return (
        <>
            <section className="main">
                <h2>trip details</h2>

                <form name="travelForm" id="travelForm" action="#" method="post" ref={formEl}>
                    <div className="clearfix">
                        <div className="formBox">
                            <label for="departure">From</label>
                            <Combobox
                                id="departure"
                                data={cities}
                                dataKey='id'
                                textField='name'
                                placeholder="Search for a city"
                                value={fromCity}
                                onChange={value => {

                                    setFromCity(value)
                                }}
                                required
                                disabled={trip.length > 0}
                            />

                            {/*<input type="text" name="departure" id="departure" placeholder="departure city" required/> */}
                        </div>
                        <div className="formBox">
                            <label for="destination">To</label>
                            <Combobox
                                id="destination"
                                data={cities}
                                dataKey='id'
                                textField='name'
                                placeholder="Search for a city"
                                value={toCity}
                                onChange={value => setToCity(value)}
                                required
                            />
                            {/*<input type="text" name="destination" id="destination" placeholder="destination city" required /> */}
                        </div>

                        <div className="formBox">
                            <label for="departure_dt">Date</label>
                            <DatePicker
                                id="departure_dt"
                                min={minDate}
                                value={dateTrip}
                                onChange={value => {
                                    console.log(value)
                                    setDateTrip(value)
                                }}
                                required
                            />
                            {/*<input type="date" name="departure_dt" id="departure_dt" required />*/}
                        </div>
                        <div className="formBox">
                            <label for="num_adults">passengers</label>

                            <input type="number"
                                name="departure_dt"
                                id="num_adults"
                                min={1}
                                required
                                value={passengers}
                                onChange={value => {

                                    setPassengers(value.target.value)
                                }
                                } />


                        </div>








                        <div className="col buttons">
                            <input type="button" name="btnAdd" id="btnAdd" value="Add"
                                disabled={!(fromCity !== null && toCity !== null && dateTrip > minDate && passengers > 0)}
                                onClick={onHanderNewTrip} />

                        </div>
                        <div className="col buttons">
                            <input type="button" name="btnShow" id="btnShow" value="show result" disabled={trip.length === 0} onClick={routeChange} />
                        </div>

                    </div>
                </form>
            </section>
            {trip.length > 0 ? <div className="table-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>from</th>
                            <th>to</th>
                            <th>date</th>
                            <th>passengers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trip.map((item, index) => {

                            console.log(item[1].name)
                            console.log(item[2])
                            console.log(item[3])
                            return (
                                <tr key={index}>
                                    <td> {item[0].name}</td>
                                    <td>{item[1].name} </td>
                                    <td>{new Date(item[2]).toLocaleDateString()}</td>
                                    <td>{item[3]}</td>
                                </tr>

                            )


                        })}
                    </tbody>

                </table>

   
                <input type="button" name="btnRemove" id="btnRemove" value="Remove"
                               
                                onClick={onHanderRemoveTrip} />

            </div> : null}


        </>


    );
};

const mapStateToProps = (state) => {
    return { ...state };

};

export default connect(mapStateToProps, { getData })(Home);