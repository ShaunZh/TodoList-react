/**
 * @Author: Hexon
 * @Date: 2017/8/19 13:53
 * @Last Modified by: Hexon
 * @Last Modified time: 2017/8/19 13:53
 */ 


export default function(props) {
  return (
    <button onClick={props.onClick.bind(this)}>{props.title}</button>
  )
}