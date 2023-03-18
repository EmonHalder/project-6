const loadData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => findData (data.data.tools))
}

const findData =(allData)=>{
      
        const today = new Date();
        const year = today.getFullYear();
        const mes = today.getMonth()+1;
        const dia = today.getDate();
        const date = dia+"/"+mes+"/"+year;
        const container = document.getElementById('all-containers');
            container.innerHTML = " ";
            // -----six card loadde--------- //
        allData.slice(0,6).forEach(item => {
            console.log(item);
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="col ">
                <div style="height:450px; width: 350px;" class="card p-3  shadow-sm ">
                    <img  src="${item.image}" class="card-img-top rounded h-50 w-100" alt="...">
                <div class="card-body ">
                    <h5 class="card-title fw-bolder">Features</h5>
                    <ol>
                    ${item.features.map(item => `
                      <li>
                        ${item }
                       
                      </li>
                    `).join('')}
                  </ol>
                    <hr></hr>
                <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title fw-bolder">${item.name}</h5>
                    <div class="d-flex gap-2 ">
                    <span><i class="fa-regular fa-calendar"></i></i></span>
                    <p>${date}</p>
                </div>
                </div>
                <div>
                <button  onclick="cardDetailsShow('${item.id}')" class="rounded-circle shadow-sm  bg-warning bg-opacity-10 border border-0"  data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"><i class="fa-solid fa-arrow-right text-danger fs-5 p-3"></i></button>
                </div>
                </div>
               </div>
              </div>
             </div>
            </div>
        `
        container.appendChild(div);

    });

        const displayMoreData  = () =>{
            
            const container = document.getElementById('all-containers');
            
            allData.slice(6,12).forEach(item => {
               
                const div = document.createElement('div');
                // ------ more card loaded --------//
                div.innerHTML = `
                <div class="col ">
                <div style="height:450px; width: 350px;" class="card p-3  shadow-sm ">
                    <img  src="${item.image}" class="card-img-top rounded h-50 w-100" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bolder">Features</h5>
                    <ol>
                    ${item.features.map(item => `
                      <li> ${item } </li>
                    `).join('')}
                  </ol>
                    <hr></hr>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title fw-bolder">${item.name}</h5>
                        <div class="d-flex gap-2 ">
                        <span><i class="fa-regular fa-calendar"></i></i></span>
                        <p>${date}</p>
                    </div>
                </div>
                <div>
                    <button  onclick="cardDetailsShow('${item.id}')" class="rounded-circle shadow-sm  bg-warning bg-opacity-10 border border-0"  data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"><i class="fa-solid fa-arrow-right text-danger fs-5 p-3"></i></button>
                </div>
                </div>
               </div>
              </div>
             </div>
            </div>
            `
            container.appendChild(div);
            toggleSpinner(false);
            
    });

    document.getElementById('see-more').style.display = 'none'

    }

    document.getElementById('see-more').addEventListener('click', function (){
        toggleSpinner(true)
      let timer1 = setTimeout(() => displayMoreData(),500);

      return () => {
        toggleSpinner(false)
        clearTimeout(timer1);
        
      };
      
    } )
   
}

const cardDetailsShow = (id) =>{
  
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data =>displayCardDetails(data))
}

// -------- modal inner card loaded -------//
const displayCardDetails = (card) =>{
    console.log(card);
    const {description, pricing, features,integrations, image_link,input_output_examples
    } = card.data;
    const getModalBody = document.getElementById('modals-body');
    getModalBody.innerHTML = " ";
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4 px-4 py-4">
        <div class="col">
            <div class="card h-100  shadow-sm bg-danger-subtle border border-danger bg-opacity-10">
                <div class="card-body">
                    <h4 class="card-title fw-semibold">${description}</h4>
                        <div class=" row g-4 text-center mt-5">
                            <div class="border bg-light-subtle  border-light   text-success p-2 rounded w-25 col mx-1 py-4">
                              <h6 class="fw-bold">${pricing[0].price}</h6>
                              <h6 class="fw-bold">${pricing[0].plan}</h6>
                        </div>
                        <div class="border bg-light-subtle  border-light   text-warning p-2 rounded w-25  col mx-1 py-4 ">
                            <h6 class="fw-bold">${pricing[1].price}</h6>
                            <h6 class="fw-bold">${pricing[1].plan}</h6>
                        </div>
                        <div class="border bg-light-subtle  border-light   text-danger p-2 rounded w-25  col mx-1 ">
                            <h6 class="fw-bold">${pricing[2].price}</h6>
                            <h6 class="fw-bold">${pricing[2].plan}</h6>
                        </div>
                    </div>
                          
                    <div class="d-flex  justify-content-around  mt-5">
                        <div>
                            <h5 class="fw-bold">Features</h5>
                            
                                <li>${features[1].feature_name}</li>
                                <li>${features[2].feature_name}</li>
                                <li>${features[3].feature_name}</li>
                              </ul>
                        </div>
                        <div>
                            <h5 class="fw-bold">Integrations</h5>
                              <li>${integrations[0]}</li>
                              <li>${integrations[1]}</li>
                              <li>${integrations[2]}</li>
                        </div>
                     </div>
                    </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card h-100 p-3 ">
                        <div class="rounded  ">
                        <img src="${image_link[0]}" class="card-img-top rounded h-100 w-100" alt="...">
                        </div>
                        <div class="card-body mt-5">
                          <h5 class="card-title text-center">${input_output_examples[0].input}</h5>
                          <p class="card-text text-center">${input_output_examples[0].output}</p>
                        </div>
                      </div>
                    </div>
                </div>
    ` 
    getModalBody.appendChild(div);
}
 
const toggleSpinner = isLoading =>{
    const getLoaderId = document.getElementById('loader');
    if(isLoading){
        getLoaderId.classList.remove('d-none');
    }
    else{
        getLoaderId.classList.add('d-none');
    }
   
}

loadData();
