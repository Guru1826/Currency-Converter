const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")


//adding multiple options
for(let select of dropdowns){
    for(currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;

        if(select.name == "from" && currCode === "USD"){
            newOpt.selected = "selected";
        }else if(select.name == "to" && currCode === "INR"){
            newOpt.selected = "selected";
        }

        select.append(newOpt);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


//funtion to change flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};



btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
   let amount = document.querySelector(".amount input");
   amtVal = amount.value;
   if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
   }

   //console.log(fromCurr.value, toCurr.value);
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[toCurr.value.toLowerCase()];

   let finalAmount = amtVal * rate;
   
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

   /* hi whatsapp */
})