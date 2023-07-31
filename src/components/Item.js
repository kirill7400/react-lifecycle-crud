function Item({ data, id, del }) {
  return (
    <div className='item'>
      <div>{ data }</div>
      <div onClick={ () => del(id) } className='del'>❌</div>
    </div>
  )
}

export default Item