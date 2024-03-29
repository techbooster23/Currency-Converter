const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let UpdatedDate = document.querySelector("#last-updated");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
            updateFlag(evt.target);
    });
}
const updateFlag = (element)=>{
      let currCode = element.value;
      let countryCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
      let img = element.parentElement.querySelector("img");
     img.src = newSrc;
}

const UpdateExchange =  async () => {
    let amount = document.querySelector("form input");
    let amtval = amount.value;
    if(amtval  ==="" || amtval < 1){
      amtval = 1;
      amount.value = "1";
    }
    console.log(fromCurr.value,toCurr.value);
      const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
      let response = await fetch(URL);
      let data = await response.json();
      UpdatedDate.innerText =data.date;
      let rate = data[toCurr.value.toLowerCase()];
      let finalAmount = amount.value * rate;
      msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click",(evt) =>{
     evt.preventDefault();
    UpdateExchange();
       
});

window.addEventListener("load",() =>{
    UpdateExchange();
});