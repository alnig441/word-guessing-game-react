function Next(props) {
  if(props.visible || props.visible === 'true') {
    return <input type="submit" value="next" onClick={props.onClick}/>
  }
}

export default Next;
