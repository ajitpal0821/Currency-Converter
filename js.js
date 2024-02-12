const base = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg=document.querySelector(".msg")

for (let code of dropdowns) {
    for (curr in countryList) {
        let newoption = document.createElement("option")
        newoption.innerText = curr;
        newoption.value = curr;

        if (code.name == "from" && curr == "USD")
            newoption.selected = "Selected"
        else if (code.name == "to" && curr == "INR")
            newoption.selected = "Selected"

        code.append(newoption);
    }

    code.addEventListener("change", (evt) => {
        updated(evt.target);
    });

}

// element is code (select)

const updated = (element) => {
    let code = element.value;// code INR
    let country2 = countryList[code]// IN
    let newsrc = `https://flagsapi.com/${country2}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

};

window.addEventListener("load",()=>{
    updaterate();
})

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updaterate();
});

const updaterate= async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal)    

    if ((amtVal === "") || (amtVal < 1)) {
        amtVal = 1;
        amount.value = "1"
    }
    // console.log(fromcurr.value,tocurr.value)
    const URL = `${base}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response=await fetch(URL)
    let data=await response.json()
    let rate=data[tocurr.value.toLowerCase()]
    // console.log(rate)
    let finalamt=rate*amtVal;
    msg.innerText=`${amtVal} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;

}
