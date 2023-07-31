import {useEffect, useState} from "react";
import axios from "axios";
import Item from "./Item";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Crud() {
  const url = 'http://localhost:7070/notes'
  const [items, setItems] = useState([])
  const [text, setText] = useState('')

  const getData = () => {
    axios.get(url)
      .then(res => {
        setItems(prevState => {

          let items = res?.data.map(item => {
            return <Item key={ item.id } id={ item.id } del={ del } data={ item.content }/>
          })
          return [items]
        })
      })
  }

  const mount = () => {
    getData()
  }

  const handler = (e) => {
    let value = e.target.value
    setText(() => {
      return value
    })
  }

  const add = () => {
    let data = {
      "id": 0,
      "content": text
    }

    setText(() => {
      return ''
    })

    axios.post(url, data)
      .then(() => getData())
  }

  const del = (id) => {
    axios.delete(url + '/' + id)
      .then(() => getData())
  }

  const update = () => {
    getData()
  }

  useEffect(mount, [])

  return(
    <div className='crud'>
      <div className='items'>
        { items }
      </div>
      <div className='add'>
        <InputGroup>
          <Form.Control value={ text } onInput={ handler } as="textarea" aria-label="Добавить задачу..." />
        </InputGroup>
        <Button onClick={ add } variant="primary">Добавить</Button>
        <Button onClick={ update } variant="primary">Обновить</Button>
      </div>
    </div>
  )
}

export default Crud