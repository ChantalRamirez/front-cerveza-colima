import React, { useContext, useEffect, useState } from "react";
import { ProductosContext } from "../../context/ProductosContext";
import { Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from "mdbreact";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Axios from "axios";
import './styles/ProductList.css'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProductList = (props) => {

  const usr = JSON.parse(localStorage.getItem("user"))
  const token = (usr ? usr.token : '')

  const [cambio,setCambio] = useState('') ;
  

  // Configuración del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [idProduct, setIdProduct] = useState(0);

  const classes = useStyles();

  const handleOpen = (id) => {
    setIdProduct(id);
    setOpen(true);
  };
  const handleClose = (idProduct) => {
    deleteProduct(idProduct);
    setCambio(idProduct)
    setOpen(false);
  };

  const [ products, setProducts]  = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const url = "https://cerveceria-app.herokuapp.com/products";
      const headers = {
        "Authorization": `Bearer ${token}`
      }
      const res = await Axios.get(url,{
        headers:headers
      })
      .then((res) => {
        setProducts(res.data.products);
      })      
      .catch((error) => {
        console.log(error)
        props.history.push("/login2");
      });
      
      
    };
    getProducts();

  },[cambio]);


  const columnas = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
      width: 150,
    },
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Description",
      field: "description",
      sort: "asc",
      width: 150,
    },
    {
      label: "Price",
      field: "price",
      sort: "asc",
      width: 150,
    },
    {
      label: "Image",
      field: "image",
      sort: "asc",
      width: 150,
    },
    {
      label: "Update",
      field: "update",
      sort: "asc",
      width: 50,
    },
    {
      label: "Delete",
      field: "delete",
      sort: "asc",
      width: 50,
    },
  ];

  let records = products.map((product) => {
    let rObj = {};
    rObj["id"] = product.id;
    rObj["name"] = product.name;
    rObj["description"] = product.description;
    rObj["price"] = product.price;
    rObj["image"] = product.image;
    rObj["update"] = (
      <Link to={`/products/edit/${product.id}`} className="btn btn-primary boton__editar">
        Modificar
      </Link>
    );
    rObj["delete"] = (
      <button
        type="button"
        className="btn btn-danger boton__eliminar"
        onClick={() => {
          handleOpen(product.id);
        }}
      >
        {" "}
        Eliminar
      </button>
    );

    return rObj;
  });

  const data = {
    columns: columnas,
    rows: records,
  };

  const deleteProduct =  (idProduct) => { 
    console.log("el idProducto: ", idProduct);

    const headers = {
      
      "Authorization": `Bearer ${token}`
    };

    console.log('el token: ',token)

    fetch(
      `https://cerveceria-app.herokuapp.com/products/delete/${idProduct}`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    
  };

  return (
    <Layout>
      <div className="Container">
            <div className="Products">
              <div className="Products__hero">
                <div className="Products__container">
                  <h3>Gestión de productos</h3>
                </div> 
              </div>
            </div>
            <div className="Table__container">
              <div className="Products__buttons">
                <Link to="/products/add" className="btn btn-primary">
                  Nuevo Producto
                </Link>
              </div>
              <MDBDataTable striped bordered small data={data} responsive />
                <Modal
                  open={open}
                  onClose={() => {
                    handleClose();
                  }}
                >
                <div style={modalStyle} className={classes.paper}>
                  <h4 className="mt-4">¿Seguro que desea eliminar el producto?</h4>
                  {/* <img className="img-fluid my-4" src={informacion.strDrinkThumb} /> */}
                  <button
                    type="button"
                    className="btn-danger boton__eliminar"
                    onClick={() => {
                      handleClose(idProduct);
                    }}
                  >
                    {" "}
                    Confirma la eliminación
                  </button>
                  {/*<p>Precio: ${producto.price}</p> */}
                   <ul>{/* { mostrarIngredientes(informacion) } */}</ul>
                </div>
              </Modal>
            </div>
          </div>
    </Layout>
  );
};

export default ProductList;
