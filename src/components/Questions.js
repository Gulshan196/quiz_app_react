import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Questions() {
  const [ques ,setQues] = useState([]);
  const [ans,setAns] = useState();
  const diff = useRef(1);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [res ,setRes] = useState(0);

  const [correct,setCorrect] = useState();
  const [change , setChange] =  useState(false);
 

  function getRandomQues() 
  {
    if(diff.current === 5) alert(`your score is ${res} out of 10`);
    axios.get(`https://quiz-app-express-e6w9.vercel.app/ques/getrand/${diff.current}`).then(val => {setQues(val.data)
    setCorrect();
  setButtonClicked(false)});
  }


 function checkAnswer(ans) {
setAns(ans)
if(ans === ques[0].correct_ans)  {
  setCorrect("ri");
   setRes((res)=>++res);}
  
else setCorrect("wr");

setTimeout(()=>{
 diff.current = diff.current + 1;
 setChange((val) => ! val);
},2000)
 }


  useEffect(()=>{
    getRandomQues();
  },[change])


  return (
    <>
    <div className='question-container'>
        <div className='question'>{ques.length!==0 && ques[0].question}</div>
       <div className='options-container'>
       {ques.length!==0 && ques[0].options.map((el,index)=>{
        return (<button className = {(ques[0].correct_ans === el && correct) ? 'correct-option' : (correct === "wr" && ans === el) ? "wrong-option" : "options"} key = {index} onClick={()=>{ setButtonClicked(true);
          checkAnswer(el)}} disabled={buttonClicked}>{el}</button>)
       })}
       </div>
        
    </div>
    </>
  )
}
