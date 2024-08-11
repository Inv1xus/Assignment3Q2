const express = require('express');
const path = require('path');
const app=express();
const port = 3000;


app.use(express.json(),express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'));
});
app.post('/findSummation',(req,res)=>{
    const N = req.body.n;
    const result = findSummation(N);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The summation of 1 to ${N} is ${result}`);
    }
});
app.post('/uppercaseFirstAndLast',(req,res)=>{
    const word = req.body.word;
    const result = uppercaseFirstAndLast(word);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The modified word is ${result}`);
    }
});
app.post('/findAverageAndMedian',(req,res)=>{
    const numbersArr = req.body.numbers;
    const result = findAverageAndMedian(numbersArr);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The average is ${result[0]} and the median is ${result[1]}`);
    }
});
app.post('/findFourDigits',(req,res)=>{
    const stringOfNumbers = req.body.stringOfNumbers;
    const result = findFourDigits(stringOfNumbers);
    if(result===false){
        res.send("Invalid input");
    }
    else{
        res.send(`The first four digits are ${result}`);
    }
});
app.listen(port, () => console.log(`Server listening on port ${port}`));






function findSummation (N){
    let sum = 0;
    if(isNaN(N)||N<0){
        return false;
    }
    for(let i = 1;i <= N;i++){
        sum += i;
    }
    return sum;
}



function uppercaseFirstAndLast(word){
    if(typeof word != "string"){
        return false;
    }
    let modifiedWord = word.charAt(0).toUpperCase()+word.substring(1,word.length-1)+word.charAt(word.length-1).toUpperCase();
    return modifiedWord;
}



function findAverageAndMedian(numbers){
    const arr = numbers.split(",");
    if(!Array.isArray(arr)){
        return false;
    }
    let sum = 0;
    for(let i = 0;i<arr.length;i++){
        sum += parseInt(arr[i]);
    }
    let average = sum/(arr.length);
    let median=0;
    const mid= Math.floor(arr.length/2);
    arr.sort((a,b)=>a-b);
    if(arr.length%2){
        median = arr[mid];
    }
    else {
        median = (arr[mid - 1] + arr[mid]) / 2;
    }
    result = [average,median];
    return result;
}


function findFourDigits(stringOfNumbers){
    if(typeof stringOfNumbers != "string"||stringOfNumbers.length<4){
        return false;
    }
    let arr = stringOfNumbers.split(" ");
    const fourDigits=[];
    for(let i = 0;i<arr.length;i++){
        if (arr[i].length = 4){
            fourDigits.push(arr[i]);
        }

    }
    return fourDigits;
}


