
export default function Input(props) {
  const data = props.data;
  const length = data.length;
  let grid = [];

  for(var i = 0 ; i < length ; i ++ ){
    grid.push(<input id={i} className={data[i].className} key={data[i].key} type="text" pattern="[a-zA-Z0-9]+" maxLength="1" onKeyUp={props.onKeyUp}/>)
  }
  return grid;

}
