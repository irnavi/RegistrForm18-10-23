

const pasword = document.querySelector('#password')
const email = document.querySelector('#email')

const clear = document.querySelector('.clear')
const registrBtn = document.querySelector('.registr')
const loginBtn = document.querySelector('.login')
const text = document.querySelector('.text')

const orderForm = document.querySelector('.order-form')
const address = document.createElement('input');


const price = document.createElement('input');
const cost = document.createElement('input');
const order = document.createElement('button');

const orderMessage = document.querySelector('.order_message');

const btnsContainer = document.querySelector('.btn_container');
const payBtn = document.querySelector('.pay_btn');
const sendBtn = document.querySelector('.send_btn');
const acceptBtn = document.querySelector('.accept_btn');
const completeBtn = document.querySelector('.complete_btn');
const loadingPay = document.querySelector('.loading_pay');
const loadingSend = document.querySelector('.loading_send');
const loadingAccept = document.querySelector('.loading_accept');
const loadingComplete = document.querySelector('.loading_complete');

const outBtn = document.querySelector('.out_btn');


const strPay = 'Заказ оплачен! Спасибо!';
const strSend = 'Заказ отправлен, ожидайте!';
const strAccept = 'Заказ успешно принят!';
const strComplete = 'Завершение заказа подтверждено!'

const obj = {
    address: address.value,
    price: price.value,
    cost: cost.value
};


let url = 'https://jsonplaceholder.typicode.com/posts';



// email.addEventListener('keydown', function() {
//   const searchTerm = this.value;
//   updateSearch(searchTerm);
// })

// function updateSearch(searchTerm){
//   let localEmail = localStorage.getItem('email');
//     if(localEmail){
//       localEmail = JSON.parse(localEmail);
//     } else {
//       localEmail = [];
//     }
  

//   const resultContainer = document.getElementById('results');
//   resultContainer.innerHTML = '';

//   const filterEmail = localEmail.filter(item => {
//     item.includes(searchTerm)
    
//   } );
  
//   if(filterEmail.length > 0) {
//     filterEmail.forEach(item => {
//       const listItem = document.createElement('li');
//       listItem.textContent = item;
//       resultContainer.appendChild(listItem);
//     });
//   } else {
//     resultContainer.innerHTML = '<li>Нет рузультатов</li>';
//   }


// }



let emailLocal = JSON.parse(localStorage.getItem("email")) ?? [];
let paswordLocal = JSON.parse(localStorage.getItem("pasword")) ?? [];


clear.onclick = ()=> {
  email.value = '';
  pasword.value = '';
  text.classList.add("hidden");

  orderForm.classList.add('hidden');
}



registrBtn.onclick = () => {
  
 if (!emailLocal.includes(email.value)) {
    emailLocal.push(email.value);
    paswordLocal.push(pasword.value)
    
    localStorage.setItem("email", JSON.stringify(emailLocal));
    localStorage.setItem('pasword',JSON.stringify(paswordLocal));

    text.classList.remove("hidden");
    text.innerHTML = "Регистрация прошла успешно!";
  } else {
    text.classList.remove("hidden");
    text.innerHTML = "Пользователь уже зарегистрирован";
  }

  
};

loginBtn.onclick = ()=> {


  if(emailLocal.includes(email.value) && paswordLocal.includes(pasword.value) ){
    text.classList.remove('hidden')
    text.innerHTML = 'Вход выполнен успешно! Добро пожаловать!'
    renderOrderForm();
  } else {
    text.classList.remove('hidden')
    text.innerHTML = 'Такого пользователя нет! Пожалуйста, зарегистрируйтесь!'
  }
  address.textContent= '';
  price.textContent = '';
  cost.textContent = '';
}


function renderOrderForm() {
    
    address.setAttribute('type', 'text');
    address.setAttribute('placeholder', 'Адрес');
  
    
    price.setAttribute('type', 'text');
    price.setAttribute('placeholder', 'Цена');
  
    
    cost.setAttribute('type', 'text');
    cost.setAttribute('placeholder', 'Стоимость');
  
    
    order.innerText = 'Создать заказ';
  
    orderForm.appendChild(address);
    orderForm.appendChild(price);
    orderForm.appendChild(cost);
    orderForm.appendChild(order);

    orderForm.classList.remove('hidden');
  }
  


  order.onclick = createOrder;



async function createOrder(){

    obj.address = address.value;
    obj.price = price.value;
    obj.cost = cost.value;


    try {
      const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(obj)
      });

      if (response.status === 201) {
          const responseData = await response.json();
          console.log(JSON.stringify(obj))
          orderMessage.classList.remove('hidden');
          orderMessage.innerHTML = 'Заказ создан';
      } else {
          orderMessage.classList.remove('hidden');
          orderMessage.innerHTML = 'Произошла ошибка. Попробуйте еще раз!';
      }
  } catch (error) {
      console.error("Ошибка при создании заказа:", error);
      orderMessage.classList.remove('hidden');
      orderMessage.innerHTML = 'Произошла ошибка. Попробуйте еще раз!';
  }

    
   
    setTimeout(function() {
        orderMessage.classList.add('hidden');
    }, 4000)

    renderBtns();



    }

    
function renderBtns(){

  setTimeout(function() {
    btnsContainer.classList.remove('hidden');
    

}, 2000)
 
}





async function createLoading(ldg){
  ldg.classList.remove('hidden');

  const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj)
  })
      
  const data =  response;
  console.log(data);
  ldg.classList.add('hidden');
  

}






function btnOnclick (btn, ldg, str) {
  btn.onclick = () => {
    

    createLoading(ldg);
    

    orderMessage.innerHTML = str;
    
    orderMessage.classList.remove('hidden');
  
  
  setTimeout(function(){
    orderMessage.classList.add('hidden');
  },2000)
    
  }
  
}






 btnOnclick(payBtn, loadingPay, strPay);
 btnOnclick(sendBtn, loadingSend, strSend);
 btnOnclick(acceptBtn, loadingAccept, strAccept);
 btnOnclick(completeBtn, loadingComplete, strComplete);


  
  
  
  outBtn.onclick = () => {
    address.value = '';
    price.value = '';
    cost.value = '';

    text.classList.add('hidden');
    orderForm.classList.add('hidden');
    btnsContainer.classList.add('hidden')
  }
  








  


  