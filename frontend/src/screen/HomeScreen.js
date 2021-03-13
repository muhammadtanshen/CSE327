import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux';
import Product from '../components/Product';
import { Row, Col } from "react-bootstrap";
// import {connect} from 'react-redux';
import {fetchAllProduct} from '../actions/index';

const HomeScreen = (props) => {
  //const [products,setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state=> state.productList);
  const {loading,error,products} = productList;
  useEffect(()=>{
    dispatch(fetchAllProduct());
    console.log();
    //props.fetchAllProduct();
  },[dispatch]);
  
  
  return (
    <div>
      <h1>Latest Product</h1>
      {loading ? <h2>Loading....</h2> : error ? <h3>{error}</h3> :  <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>}
     
    </div>
  );
};


// const mapStateToProps = (state)=>{
//   console.log(state);
//   return{
//     products:state.productList.products,
//   }
// }

export default (HomeScreen);



// class HomeScreen extends React.Component{
//   componentDidMount(){
//     this.props.fetchAllProduct();
//   }
//   render(){
//     return(
//       <div>
//       <h1>Latest Product</h1>
//       <Row>
//         {this.props.products.map((product) => (
//           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//             <Product product={product}></Product>
//           </Col>
//         ))}
//       </Row>
//     </div>
//     )
//   }
// }

// const mapStateToProps = (state)=>{
//   console.log(state);
//   return{
//     products:state.productList.products,
//   }
// }


// export default connect(mapStateToProps,{fetchAllProduct})(HomeScreen);
