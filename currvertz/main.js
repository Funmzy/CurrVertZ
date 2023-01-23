import './style.css'
import axios from "axios";




document.querySelector('.form-valueA').addEventListener('click', function(){
    document.querySelector('.from-input').classList.remove('hidden')
    document.querySelector('.form-valueA').classList.add('hidden')
    document.querySelector('.listA').classList.remove('hidden')
    
})


document.querySelector('.form-valueB').addEventListener('click', function(){
    document.querySelector('.to-input').classList.remove('hidden')
    document.querySelector('.form-valueB').classList.add('hidden')
    document.querySelector('.listB').classList.remove('hidden')
    
})




let listA = document.querySelector('.currencyListA')
let listB = document.querySelector('.currencyListB')

const currencyList = [
    {
        'name': 'NGN-Naira',
        'code': 'NGN',
        'img': 'nigeria-circular',
        'logo': 'fa-solid_fa-naira-sign'
        // 'logo': 'nairaLog'
    },
    {
        'name': 'US-Dollar',
        'code': 'USD',
        'img': 'usa-circular',
        'logo': 'fa_fa-usd'
        // 'logo': 'dollarLogo'
    },
    {
        'name': 'Euro',
        'code': 'EUR',
        'img': 'Europe-circular',
        'logo': 'fa_fa-eur'
    },
    {
        'name': 'British-Pound',
        'code': 'GBP',
        'img': 'great-britain-circular',
        'logo': 'fa_fa-gbp'
    },
    {
        'name': 'Canadian-Dollar',
        'code': 'CAD',
        'img': 'canada-circular',
        'logo': 'fa_fa-usd'
    },
    {
        'name': 'Australian-Dollar',
        'code': 'AUD',
        'img': 'australia-circular',
        'logo': 'fa_fa-usd'
    },
    {
        'name': 'Japanese-Yen',
        'code': 'JPY',
        'img': 'japan-circular',
        'logo': 'fa_fa-jpy'
    },
]

let currencyListHtmlA = ''
let currencyListHtmlB = ''

let currencyA=''
let currencyB=''


currencyList.forEach((curr) =>{
    currencyListHtmlA += `
        <div class="list-value ${curr.code} A" data-img=${curr.img} data-name=${curr.name} data-logo=${curr.logo} id="${curr.code}">
            <img src="/icon/${curr.img}.png" alt="" class="currency-iconA currIcon">
            <div class="from-currencyTemp"><span class="currCode">${curr.code} - </span><span class="currName">${curr.name}</span></div>
        </div>`
    
    currencyListHtmlB += `
    <div class="list-value ${curr.code} B" data-img=${curr.img} data-name=${curr.name} id="${curr.code}">
        <img src="/icon/${curr.img}.png" alt="" class="currency-iconB currIcon">
        <div class="from-currencyTemp"><span class="currCode">${curr.code} - </span><span class="currName">${curr.name}</span></div>
    </div>`
    
})



listA.insertAdjacentHTML('afterbegin',currencyListHtmlA)
listB.insertAdjacentHTML('afterbegin',currencyListHtmlB)

listA.addEventListener('click', function(event){
    const fullDiv = event.target.closest('.list-value') 
    if(fullDiv){
        document.querySelector('.currency-iconA').src= `/icon/${fullDiv.dataset.img}.png`
        document.querySelector('.from-A').textContent= `${fullDiv.id} - `
        document.querySelector('.from-B').textContent= ` ${fullDiv.dataset.name}`
        document.querySelector('.from-value').textContent= `${fullDiv.id} = `

        const logo = fullDiv.dataset.logo.split('_')
        console.log(logo, fullDiv.dataset.logo)
        console.log(document.querySelector('#logo'))
        const logoEl = document.querySelector('#logo')
        logoEl.className=''
        logo.forEach((item)=>{
                console.log(item)
                logoEl.classList.add(item)
                
            })
        document.querySelector('.from-input').classList.add('hidden')
        document.querySelector('.form-valueA').classList.remove('hidden')
        document.querySelector('.listA').classList.add('hidden')
        currencyA= `${fullDiv.id}`
    }
})


listB.addEventListener('click', function(event){
    const fullDiv = event.target.closest('.list-value') 
    
    if(fullDiv){
        document.querySelector('.currency-iconB').src= `/icon/${fullDiv.dataset.img}.png`
        document.querySelector('.to-A').textContent= `${fullDiv.id} - `
        document.querySelector('.to-B').textContent= ` ${fullDiv.dataset.name}`
        document.querySelector('.from-code').textContent= ` ${fullDiv.id}`
        document.querySelector('.exchange-code').textContent = ` ${fullDiv.dataset.name}`
        document.querySelector('.to-input').classList.add('hidden')
        document.querySelector('.form-valueB').classList.remove('hidden')
        document.querySelector('.listB').classList.add('hidden')
        currencyB = `${fullDiv.id}`

    }
})


// Conversion feature

document.querySelector('.convert').addEventListener('click', function(){
    const amount = Number(document.querySelector('.amount').value);
    let fromCurrency = document.querySelector('.from-B').textContent
    
    if(amount > 1){
        fromCurrency = fromCurrency + 's'
    }
    else{
        fromCurrency =fromCurrency
    }
    document.querySelector('.amount-rep').textContent = amount +".00";
    document.querySelector('.rate-currency').textContent = `${fromCurrency} =`;
    document.querySelector('.rates').classList.remove('hidden')




    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {to_currency: currencyB, function: 'CURRENCY_EXCHANGE_RATE', from_currency: currencyA},
        headers: {
          'X-RapidAPI-Key': 'f4720a2e50mshb0c170e0f7a056ep10fa1ejsn2cb22da8db88',
          'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        const value = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
        console.log(response.data,value)
        document.querySelector('.exchange-rate').textContent=(Number(value) * amount).toFixed(5)
        document.querySelector('.from-rate').textContent=value
      }).catch(function (error) {
          console.error(error);
      });
})


// Switch button feature

document.querySelector('.arrow').addEventListener('click', function(){
    const currIconA = document.querySelector('.currency-iconA')
    const currCodeA = document.querySelector('.from-A')
    const currNameA = document.querySelector('.from-B')
    const fromSrc = currIconA.src
    const fromCode = currCodeA.textContent
    const fromName = currNameA.textContent
   

    const currIconB = document.querySelector('.currency-iconB')
    const currCodeB = document.querySelector('.to-A')
    const currNameB = document.querySelector('.to-B')
    const toSrc = currIconB.src
    const toCode = currCodeB.textContent
    const toName = currNameB.textContent
   

    currIconA.src = toSrc
    currCodeA.textContent = toCode
    currNameA.textContent = toName

    currIconB.src = fromSrc
    currCodeB.textContent = fromCode
    currNameB.textContent = fromName


    const val = currencyList.find(curr =>{
       

       return curr.name === toName.trim()
    })
    const logo = val.logo.split('_')
       
    const logoEl = document.querySelector('#logo')
    logoEl.className=''
    logo.forEach((item)=>{
           
            logoEl.classList.add(item)
            
        })

})

// Search feature

const searchItem = (el, val) =>{
    const searchInput = el.value.toUpperCase();
    const listItems = document.querySelectorAll(`.${val}`);
    listItems.forEach((item)=> {
        let text = item.textContent;
        if(text.toUpperCase().includes(searchInput.toUpperCase())){
            item.style.display = '';
        }
        else {
            item.style.display = 'none';
        }
    })
}

const inputA = document.querySelector('.myInputA')
const inputB = document.querySelector('.myInputB')

inputA.addEventListener('input', filterListA);
inputB.addEventListener('input', filterListB);

function filterListA(){

   searchItem(inputA, 'A')   
}

function filterListB(){

    searchItem(inputB, 'B')   
 }




