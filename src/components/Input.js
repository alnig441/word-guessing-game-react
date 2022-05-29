import React from 'react';


export default function Input(props) {
  const data = props.data;

  return (
    <React.Fragment>
       {data && data.map(element => {
          let {tag, className, key, id, children, maxLength, pattern} = element
          if(tag === "div") {
               return(
                  <div className={className} id={id} key={key} >
                     {children && <Input data={children} onKeyUp={props.onKeyUp}/>}
                   </div>
                 )
           } else if(tag === "input") {
               return(
                  <input className={className} id={id} key={key} maxLength={maxLength} onKeyUp={props.onKeyUp} pattern={pattern} />
                )
          }
      })}
   </React.Fragment>
)

}
