const form =document.querySelector('form');
form.addEventListener('submit',function(e){
    e.preventDefault();
    const height=parseInt(document.querySelector('#height').value);
    const weight=parseInt(document.querySelector('#weight').value);
    const results=document.querySelector('#results');
    if(height==='' || height<0 || isNaN(height)){
        results.innerHTML=`Please give a valid Height`;
    }
    else if(weight==='' || height<0 || isNaN(weight)){
        results.innerHTML=`Please give a valid Weight`;
    }
    else{
        const bmi=(weight/((height*height)/10000)).toFixed(2);
        results.innerHTML=`<span>${bmi}</span>`
        if(bmi<18.6){
            review.innerHTML=`Under-weight!`;
        }
        else if(bmi>=18.6 && bmi<=24.9){
            review.innerHTML=`You are Fit !`;
        }
        else if(bmi>24.9){
            review.innerHTML=`Over-weight!`
        }
    }
    })
