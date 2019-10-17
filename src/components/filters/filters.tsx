import React, { Component } from 'react'
import classes from './filters.module.css'
import ErrorLog from '../../erros/errors.json'
import _ from "lodash";

type MyState = { data: any , res : any , display : boolean , filterData : any };

export default class Filters extends Component<{},MyState>{
constructor(props:any) {
super(props);

this.state = {
data :  ErrorLog.data,
res : [],
display : false,
filterData : []
}

}


componentDidMount(){

  
       let ErrorLog = this.state.data;
       let results : any = [];

        // Loop Through the ErrorLog
       for (let i = 0; i < ErrorLog.length; i++) {

       // similar indexes returned to be pushed in Results Array
           let index = GetIndexIfLogExists(ErrorLog[i],results) ;

                   if(index >= 0)
           {
            results[index].message += "\n"+ ErrorLog[i].message;
           }
           else
           {
               results.push(ErrorLog[i]);
           }
       };
  
       // returning only those indexes which has same facility , level  and timeStamp

    function GetIndexIfLogExists(value : any , arr : any)  {
       let index = -1;
       for (let i = 0; i < arr.length; i++) {
  
           if (arr[i].facility === value.facility &&
               arr[i].level === value.level &&
               arr[i].timeStamp === value.timeStamp
           ) {
               index = i;
               break
           }
       }
       return index;
    };

//removing duplications from results array using lodash
 let unique =  _.uniqBy(results, function (e:any) {
    return e.message || e.TimeStamp 
  });


// setting the state
this.setState({
res: unique

});
};




// Filter handler 

filterHandler = (e:React.FormEvent<HTMLSelectElement>) => {

 const {value} : any = e.target;

 let facility = null;
// getting all the facility from errorLog by mapping
 let AllFacilities = this.state.res.filter(( facilities : any ) => (facilities.facility === value)) ; 

 console.log(AllFacilities);

// for facility
if(value === AllFacilities){

facility = this.state.res.filter( (filterData : any) => (filterData.facility === value))

  this.setState({

  filterData:  facility,
  display : true
  });
} else{
    this.setState({

        display : false
        });

}


};







render() {

  
//mapping the entire array

 let ShowingResults = this.state.filterData.map( (data: any , index: any ) => ( <>

 <span key={data.messages}> Facility:  {data.facility} </span> <br/>

 <span> Level:  {data.level} </span>  <br/> 

     {data.message.split('\n').join('<br/>')}    <br/> 
 <p> TimeStamp:  {data.timeStamp}  </p>

 <hr/>
  
 </>

));
    

    return (
<>
 <div className={classes.box}>
 <h1> Error-LOG SEARCH !</h1>
    
 <label >search by facility</label> 

   <select className={classes.all} onChange={(e) => this.filterHandler(e)}>
    <option value=""></option>
    <option value="GF::afml">GF::afml</option>
    <option value="GF::eai:eproduct">GF::eai:eproduct</option>
   </select>
</div>

<div className={classes.results}> 

        
        {ShowingResults} 
</div>

</>
        )
    }
}
