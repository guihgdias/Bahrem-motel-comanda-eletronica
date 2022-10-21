const getCustomers = () => JSON.parse(localStorage.getItem('customersDatabase')) ?? [];
const setCustomers = (database) => localStorage.setItem('customersDatabase', JSON.stringify(database));
const $ = document.querySelector.bind(document);

//Get system date
function GET_EXACT_DATE() {
  let time = new Date();

  let day = time.getDate();
  let month = time.getUTCMonth();
  let year = time.getFullYear();
  
  let date = `${day}/${(month + 1).toString().padStart(2, '0')}/${year}`;

  return date;
}

//Get system hours
function GET_EXACT_HOURS() {
  let time = new Date();

  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();

  let hours = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

  return hours;
}

//Clear all customers that have already been rendered on screen to avoid multiplied rendering
function CLEAR_CUSTOMER_TABLE_ON_HTML() {
  let customerList = document.querySelector('.customers-table tbody');

  while(customerList.children.length > 1) {
    customerList.removeChild(customerList.lastChild);
  }
}

//Add customer to a HTML structure
function addCustomer(customerUser) {
  let customerItem = document.querySelector('.models .customer').cloneNode(true);
  $('.customers-table tbody').append(customerItem);

  let customerItem$ = customerItem.querySelector.bind(customerItem);

  customerItem$('.id').innerHTML = customerUser.id;
  customerItem$('.name').innerHTML = customerUser.customerName;
  customerItem$('.bedroom').innerHTML = customerUser.bedroom;
  customerItem$('.stay').innerHTML = customerUser.stay;
  customerItem$('.car').innerHTML = customerUser.carName;
  customerItem$('.time-enter').innerHTML = customerUser.timeEnter;
  if(customerUser.timeExit != false) {
    customerItem$('.buttons #exit-customer').style.display = 'none';
    customerItem$('.buttons #exit-customer').innerHTML = 'Saiu';
    customerItem$('.buttons #edit-customer').style.display = 'block';
    customerItem$('.time-exit').innerHTML = customerUser.timeExit;
  } else {
    customerItem$('.buttons #edit-customer').style.display = 'none';
    customerItem$('.time-exit').innerHTML = 'Não Saiu';
  }
}

//Render all customers that are in localstorage
function renderCustomers() {
  let customersUsers = getCustomers();
  customersUsers.forEach(c => addCustomer(c));
  
  LOAD_EDIT_CUSTOMERS_BUTTON();
  LOAD_EXIT_CUSTOMERS_BUTTON();
}

//Take the customer ID that was clicked
function checkCustomer(id) {
  let customerId = id[0].textContent;
  return customerId;
}

//Take the exit button from HTML
function LOAD_EXIT_CUSTOMERS_BUTTON() {
  let confirmButton = document.querySelectorAll('.customers-table #exit-customer');
  confirmButton.forEach((item) => {
    item.addEventListener('click', (e) => {
      let customerHMTL = item.parentElement.parentElement.cells;
      let customerDataId = checkCustomer(customerHMTL);
      if(item.classList.contains('exit') === false) {
        if(confirm('Você tem certeza?') == true) {
          item.style.display = 'none';

          let getCustomer = getCustomers();

          getCustomer.forEach((e) => {
            if(e.id == customerDataId) {
              e.timeExit = GET_EXACT_HOURS();
              setCustomers(getCustomer);
              CLEAR_CUSTOMER_TABLE_ON_HTML();
              renderCustomers();
            }
          })
        }
      }
    })
});
}

//Take the edit button from HTML
function LOAD_EDIT_CUSTOMERS_BUTTON() {
  let confirmButton = document.querySelectorAll('.customers-table #edit-customer');
  confirmButton.forEach((item) => {
  item.addEventListener('click', (e) => {
    $('.editModal').style.visibility = 'visible';
    let customerHtml = item.parentElement.parentElement.cells;
    let customerId = checkCustomer(customerHtml);
    
    let getCustomer = getCustomers();

    getCustomer.forEach((e) => {
      if(e.id == customerId) {
        $('.editModal .id').innerHTML = e.id;
        $('.editModal .name').innerHTML = e.customerName;
        $('.editModal .bedroom').innerHTML = e.bedroom;
        $('.editModal .stay').innerHTML = e.stay;
        $('.editModal .car').innerHTML = e.carName;
        $('.editModal .color').innerHTML = e.carColor;
        $('.editModal .plate').innerHTML = e.carPlate;
        $('.editModal .description').innerHTML = e.notes;
        $('.editModal .dateEnter').innerHTML = e.timeDate;
        $('.editModal .hoursEnter').innerHTML = e.timeEnter;
        $('.editModal .dateExit').innerHTML = e.timeDate;
        $('.editModal .hoursExit').innerHTML = e.timeExit;

        $('.editModal .closeModal').addEventListener('click', () => {
          $('.editModal').style.visibility = 'hidden';
        })
      }
    })
  })
});
}

renderCustomers();