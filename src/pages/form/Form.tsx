import { useState } from 'react';
import { Navbar } from '../../components/Exports';
import { database, storage } from '../../firebase/config';
import { ref, set, push } from "firebase/database";
import { ref as sRef, uploadBytes } from "firebase/storage";
import { store } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './Form.css';

export default function Form() {
  const uid = store.getState().auth.uid;
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [file, setFile] = useState<any>(null);
  const [data, setData] = useState({
    cloth_type: '' as string,
    cloth: '' as string,
  });
  

  const { cloth_type, cloth } = data;

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    if (data.cloth_type != '' && data.cloth != '') {
      if(file != null) {
        const { metadata } = await uploadBytes( sRef(storage, uid + '/' + file.name), file);

        const newCloth = push(ref(database, 'cloths'));
        await set(newCloth, {
          user: store.getState().auth.uid,
          cloth_type: cloth_type,
          cloth: metadata.bucket + '/' + metadata.fullPath,
        });

        navigate('/home');
        
      } else {
        setErr('No seleccionaste una foto');
      }
    } else {
      setErr('No seleccionaste el tipo de ropa');
    }
  }

  const change = (e : any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const selectFile = (e : any) => {
    change(e);

    setFile(e.target.files[0]);
  }

  return (
    <div className='Form'>
      <Navbar />

      <div className='Form-content'>
        <h1 className='Form-title'>Añade una prenda</h1>
        <form onSubmit={ handleSubmit } >
          {
            err != '' && <p className='Form-error'>{ err }</p>
          }
          
          <div className='Form-input-div'>
            <label htmlFor="cloth_type" className='Form-input-label'>Tipo de prenda</label>
            <select className='Form-select' name='cloth_type' defaultValue={'none'} onChange={ change }>
              <option value="none" disabled className='Form-select-disabled'>Selecciona una opción</option>
              <option value="top">Parte de arriba</option>
              <option value="bot">Parte de abajo</option>
              <option value="unic">Cuerpo</option>
              <option value="coat">Abrigo</option>
              <option value="shoe">Zapatos</option>
            </select>
          </div>

          <div className='Form-input-div'>
            <label htmlFor="cloth" className='Form-input-label'>Prenda</label>

            <div className='Form-file-div'>
              <input type="file" name='cloth' value={ cloth } onChange={ selectFile } className='Form-file'/>
              {
                file == null 
                ? <p className='Form-file-text'>Selecciona una imagen</p>
                : <> 
                    <img className='Form-image-img' src={ URL.createObjectURL(file) } alt="" />
                  </>
              }
            </div>
          </div>

          <button type="submit" className='Form-button'>Enviar</button>
        </form>
      </div>
    </div>
  )
}
