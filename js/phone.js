const loadData=()=>{
    const inputField=document.getElementById('search-input');
    const searchText=inputField.value;
    //console.log(searchText);
           /////////////error handle for empty input field
    if(searchText==''){
      document.getElementById('error-show').style.display='block';
    }else{
      document.getElementById('error-show').style.display='none';
      inputField.value=''; 
      const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
      fetch(url)
      .then(res=>res.json())
      .then(value=>searchData(value.data))
     // console.log(meals.length);
    }
   
   
}


const searchData=data=>{
 
  
  const div=document.getElementById('phone-info');
  div.textContent='';

    // error show
   // console.log(meals);
   /////////////error handle for irrelavent search
    if(data.length==0)
    {
        document.getElementById('error-show').style.display='block';
    }else{
      document.getElementById('error-show').style.display='none';
      data.forEach(element => {
        
        const innerDiv=document.createElement('div');
        
      //  innerDiv.classList.add('col');
        innerDiv.innerHTML=`
        <div  class="card  mt-4 mx-4 col-lg-4 col-sm-12" style="width: 18rem;">
        
        <img src="${element.image}" class="card-img-top" alt="...">
       
        <div class="card-body">
          <h5 class="card-title">${element.phone_name}</h5>
          <p class="card-text">${element.brand}</p>
        <button onclick="loadDetailPhone('${element.slug}')">Details</button>
        </div>
      </div>
`
div.appendChild(innerDiv);
     });
        
    }

         
}

const loadDetailPhone = slug=>{
    //console.log(slug);
      const url=`https://openapi.programming-hero.com/api/phone/${slug}`
      fetch(url)
      .then(res=>res.json())
      .then(valueSlug=>displayPhoneDetail(valueSlug))
}

const displayPhoneDetail=dataPhone=>{
    //console.log(dataPhone);
  const div2=document.getElementById('display-phone-detail');
  const div3=document.createElement('div');
  div2.innerHTML='';
  div3.innerHTML=`<div class="card col-6 mx-auto" style="width: 18rem;">
  <img src="${dataPhone.data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${dataPhone.data.name}</h5>
    <p class="card-text">${dataPhone.data.releaseDate}</p>
    
  </div>
</div>`;

div2.appendChild(div3);

}
