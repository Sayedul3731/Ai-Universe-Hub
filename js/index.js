
const loadData = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const technologies = data.data.tools;
  displayTechnology(technologies)
}
const displayTechnology = (technologies) => {
  const technologyContainer = document.getElementById('technology-container')
  technologies.forEach(technology => {
    const technologiesCard = document.createElement('div');
    technologiesCard.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl p-4">
        <figure><img src="${technology?.image || 'No image'}" /></figure>
        <div class="card-body">
          <h2 class="card-title font-bold">Features </h2>
          <div class="ml-4">
          <ol class="list-decimal">
              <li>Natural language processing</li>
              <li>Contextual understanding</li>
              <li>Text generation</li>
          </ol>
          </div>
          <hr>
          <h3 class="font-bold">${technology.name}</h3>
          <time>${technology.published_in}</time>
          <div class="card-actions justify-end">
            <button onclick="showTechnologyDetails('${technology.id}')" class="btn bg-orange-100 rounded-full"><span class="text-red-400">></span></button>
          </div>
        </div>
      </div>
        ` ;
    technologyContainer.appendChild(technologiesCard)
  });
}
const showTechnologyDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
  const technology = data.data;
  console.log(technology);
  const closeBtn = document.getElementById('close-btn');
  closeBtn.innerHTML = `
  <div class="modal-action">
  <button class="btn btn-circle btn-outline bg-red-500 text-white">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
</div>
  `
  const showModalDesc = document.getElementById('show-modal-desc');
  showModalDesc.innerHTML = `<h3 class="font-bold text-lg">${technology?.description || 'No description'}</h3>
  <div class="flex gap-3">
  <div class="shadow-sm bg-white text-[#03A30A] p-2 rounded-lg">${technology?.pricing[0]?.price || 'No Price'} ${technology?.pricing[0]?.plan || 'No Plan'}</div>
  <div class="shadow-sm bg-white text-[#F28927] p-2 rounded-lg">${technology?.pricing[0]?.price || 'No Price'} ${technology?.pricing[0]?.plan || 'No Plan'}</div>
  <div class="shadow-sm bg-white text-[#EB5757] p-2 rounded-lg">${technology?.pricing[0]?.price || 'No Price'} ${technology?.pricing[0]?.plan || 'No Plan'}</div>
  </div>
  <div class="flex mt-5">
  <div>
  <h3 class="font-medium">Features</h3>
  <ol class="list-disc ml-7 mt-4">
    <li>${technology?.features['1']?.feature_name || 'No feature-name'}</li>
    <li>${technology?.features['2']?.feature_name || 'No feature-name'}</li>
    <li>${technology?.features['3']?.feature_name || 'No feature-name'}</li>
  </ol>
  </div>
  <div>
  <h3 class="font-medium">integrations</h3>
  <ol class="list-disc ml-7 mt-4">
    <li>${technology?.integrations[0] || 'No'}</li>
    <li>${technology?.integrations[1] || 'No'}</li>
    <li>${technology?.integrations[2] || 'No'}</li>
  </ol>
  </div>
  </div>
 `
  const showModalWithImg = document.getElementById('show-modal-img-with-desc');
  showModalWithImg.innerHTML = ` 
  <img src="${technology.image_link[0]}">
  <p class="font-medium mt-4">${technology?.input_output_examples[0]?.input || 'No input'}</p>
  <p class="font-small mt-4">${technology?.input_output_examples[0]?.output || 'No output'}</p>`
  show_technology_details.showModal()
}

loadData()