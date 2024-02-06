
const Item = ({name, index, score}) => {
  return (
    <div className="item">
        <samp>{index}</samp>
        <samp>{name}</samp>
        <samp>{score} Ps</samp>
    </div>
  )
}

export default Item
