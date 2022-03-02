
///////spinner add
const toggleSpinner=displaySpin=>{
  document.getElementById('spinner').style.display=displaySpin;
}

const loadData=()=>{
    const inputField=document.getElementById('search-input');
    const searchText=inputField.value;
    
    toggleSpinner('block');
  

/////////////error handle for empty input field
    if(searchText==''){
//error handle clear div

      const div=document.getElementById('phone-info');
      div.textContent='';

      const div2=document.getElementById('display-phone-detail');
      div2.textContent='';

      document.getElementById('error-show').style.display='block';

      toggleSpinner('none');

    }else{

      document.getElementById('error-show').style.display='none';
      inputField.value=''; 
      const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
      fetch(url)
      .then(res=>res.json())
      .then(value=>searchData(value.data))
     
    }
   
   
}


         ///// search data

const searchData=data=>{
  
   
  const div=document.getElementById('phone-info');
  div.textContent='';

  const div2=document.getElementById('display-phone-detail');
  div2.textContent='';
 
   /////////////error handle for irrelavent search
    if(data.length==0)
    {
        document.getElementById('error-show').style.display='block';

        toggleSpinner('none');

    }else{
      
      document.getElementById('error-show').style.display='none';
      
        ////////array slice first 20

      let data1=data.slice(0, 20);
      
      data1.forEach(element => {
       
        const innerDiv=document.createElement('div');
        
        innerDiv.classList.add('col-lg-4', 'col-sm-12');
        innerDiv.innerHTML=`
        <div  class="card my-5 mx-3" >
        
        <img src="${element.image}" class="card-img-top px-2 pt-2" alt="...">
       
        <div class="card-body">
          <h5 class="card-title">${element.phone_name}</h5>
          <p class="card-text">${element.brand}</p>
        <button class="btn btn-primary" onclick="loadDetailPhone('${element.slug}')">Details</button>
        </div>
      </div>`

      div.appendChild(innerDiv);


     })

     toggleSpinner('none');
            ///////Show All Result
            let dataLength=data.length;
            let data2=data.slice(21,dataLength);
     const showAllresult=document.getElementById('show-all-result').addEventListener('click',function(){
      data2.forEach(element => {
       
        const innerDiv=document.createElement('div');
        
      innerDiv.classList.add('col-lg-4', 'col-sm-12');
        innerDiv.innerHTML=`
        <div  class="card my-5 mx-3" >
        
        <img src="${element.image}" class="card-img-top px-2 pt-2" alt="...">
       
        <div class="card-body">
          <h5 class="card-title">${element.phone_name}</h5>
          <p class="card-text">${element.brand}</p>
        <button class="btn btn-primary" onclick="loadDetailPhone('${element.slug}')">Details</button>
        </div>
      </div>`
     
      div.appendChild(innerDiv);


     })
     })
     
        
    }

         
}

 ////////// show details phone

const loadDetailPhone = slug=>{

      const url=`https://openapi.programming-hero.com/api/phone/${slug}`
      fetch(url)
      .then(res=>res.json())
      .then(valueSlug=>displayPhoneDetail(valueSlug))
}

const displayPhoneDetail=dataPhone=>{
    const release='Release Date Not Found';
    const otherIfo='Other Information No Available';
  const div2=document.getElementById('display-phone-detail');
  const div3=document.createElement('div');
  div2.textContent='';


  if(dataPhone.data.releaseDate==''){
    div3.innerHTML=`<div class="card col-6 mx-auto" style="width: 18rem;">
    <img src="${dataPhone.data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Model: ${dataPhone.data.name}</h5>
      
      <p class="card-text text-primary">Release Date: ${release}</p>


    <p class="card-text">Storage: ${dataPhone.data.mainFeatures.storage}</p>
    <p class="card-text">DisplaySize: ${dataPhone.data.mainFeatures.displaySize}</p>
    <p class="card-text">ChipSet: ${dataPhone.data.mainFeatures.chipSet}</p>
    <p class="card-text">Memory: ${dataPhone.data.mainFeatures.memory}</p>


    <p class="card-text">Sensor: ${dataPhone.data.mainFeatures.sensors[0]}, ${dataPhone.data.mainFeatures.sensors[1]}, ${dataPhone.data.mainFeatures.sensors[2]}, ${dataPhone.data.mainFeatures.sensors[3]}, ${dataPhone.data.mainFeatures.sensors[4]}, ${dataPhone.data.mainFeatures.sensors[5]}</p>
    
    
    <p class="card-text"> ${'others' in dataPhone.data? `WLAN: ${dataPhone.data.others.WLAN}<br> Bluetooth: ${dataPhone.data.others.Bluetooth}<br> GPS: ${dataPhone.data.others.GPS}<br> NFC: ${dataPhone.data.others.NFC}<br> Radio: ${dataPhone.data.others.Radio}<br> USB: ${dataPhone.data.others.USB}` :`${otherIfo}`}</p>


    


      </div>
      </div>`;
  }
  
  else{
  div3.innerHTML=`<div class="card col-6 mx-auto" style="width: 18rem;">
  <img src="${dataPhone.data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Model: ${dataPhone.data.name}</h5>
    <p class="card-text text-primary">Release Date: ${dataPhone.data.releaseDate}</p>


    <p class="card-text">Storage: ${dataPhone.data.mainFeatures.storage}</p>
    <p class="card-text">DisplaySize: ${dataPhone.data.mainFeatures.displaySize}</p>
    <p class="card-text">ChipSet: ${dataPhone.data.mainFeatures.chipSet}</p>
    <p class="card-text">Memory: ${dataPhone.data.mainFeatures.memory}</p>


    <p class="card-text">Sensor: ${dataPhone.data.mainFeatures.sensors[0]}, ${dataPhone.data.mainFeatures.sensors[1]}, ${dataPhone.data.mainFeatures.sensors[2]}, ${dataPhone.data.mainFeatures.sensors[3]}, ${dataPhone.data.mainFeatures.sensors[4]}, ${dataPhone.data.mainFeatures.sensors[5]}</p>
    

    
   


    <p class="card-text"> ${'others' in dataPhone.data? `WLAN: ${dataPhone.data.others.WLAN}<br> Bluetooth: ${dataPhone.data.others.Bluetooth}<br> GPS: ${dataPhone.data.others.GPS}<br> NFC: ${dataPhone.data.others.NFC}<br> Radio: ${dataPhone.data.others.Radio}<br> USB: ${dataPhone.data.others.USB}` :`${otherIfo}`}</p>
    

    </div>
</div>`;
  }

 

div2.appendChild(div3);

}
