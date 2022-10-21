//Evento de click do botão que adiciona um cliente no localstorage
let buttonSubmitCustomer = document.querySelector('.newcustomer-form .submitCustomer');

buttonSubmitCustomer.addEventListener('click', (e) => {
  e.preventDefault();

  console.log()

  let bedroomValueHtml = document.querySelector('#bedrooms').value;
  let stayValueHtml = document.querySelector('#stay').value;
  let customerValueHtml = document.querySelector('#customer').value;
  let carValueHtml = document.querySelector('#car').value;
  let colorValueHtml = document.querySelector('#color').value;
  let plateValueHtml = document.querySelector('#plate').value;
  let noteValueHtml = document.querySelector('#note').value;
  let exactTime = GET_EXACT_HOURS();
  let randomId = Math.floor(Math.random() * 99999) + 1;

  if(bedroomValueHtml === 'default' || stayValueHtml === 'default' || !customerValueHtml || !carValueHtml || !plateValueHtml) {
    window.alert('Preencha os campos.');
    return;
  }

  newCustomer = {
    id: randomId,
    bedroom: bedroomValueHtml,
    stay: stayValueHtml,
    customerName: customerValueHtml,
    carName: carValueHtml,
    carColor: colorValueHtml,
    carPlate: plateValueHtml,
    notes: noteValueHtml,
    timeEnter: exactTime,
    timeExit: false,
    timeDate: GET_EXACT_DATE()
  }

  const customersDatabase = getCustomers();
  customersDatabase.push(newCustomer);

  localStorage.customersDatabase = JSON.stringify(customersDatabase);

  addCustomer(newCustomer);

  document.querySelector('#bedrooms').value = 'default';
  document.querySelector('#stay').value = 'default';
  document.querySelector('#customer').value = '';
  document.querySelector('#car').value = '';
  document.querySelector('#color').value = '';
  document.querySelector('#plate').value = '';
  document.querySelector('#note').value = '';

  LOAD_EDIT_CUSTOMERS_BUTTON();
  LOAD_EXIT_CUSTOMERS_BUTTON();
})