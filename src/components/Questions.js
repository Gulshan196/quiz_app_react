import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Questions() {
  const [ques ,setQues] = useState([]);
  const [ans,setAns] = useState();
  const diff = useRef(1);
  const [correct,setCorrect] = useState();
 

  function getRandomQues() 
  {
    axios.get(`https://quiz-app-express-e6w9.vercel.app/ques/getrand/${diff.current}`).then(val => {setQues(val.data)});
  }


 function checkAnswer(ans) {
setAns(ans)
if(ans === ques[0].correct_ans) return setCorrect("ri");
return setCorrect("wr");
 }


  useEffect(()=>{
    getRandomQues();
  },[])


  return (
    <>
    <div className='question-container'>
        <div className='question'>{ques.length!==0 && ques[0].question}</div>
       <div className='options-container'>
       {ques.length!==0 && ques[0].options.map((el,index)=>{
        return (<div className = {(ques[0].correct_ans === el && correct) ? 'correct-option' : (correct === "wr" && ans === el) ? "wrong-option" : "options"} key = {index} onClick={(e)=>{checkAnswer(el)}}>{el}</div>)
       })}
       </div>
        
    </div>
    </>
  )
}
