import faker from 'faker';
import { isUndefined, sample } from 'lodash';
import fetch from 'sync-fetch';
// utils
import { mockImgProduct } from '../utils/mockImages';

const PRODUCT_NAME = [
  'Nike Air Force 1 NDESTRUKT',
  'Nike Space Hippie 04',
  'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  'Nike Blazer Low 77 Vintage',
  'Nike ZoomX SuperRep Surge',
  'Zoom Freak 2',
  'Nike Air Max Zephyr',
  'Jordan Delta',
  'Air Jordan XXXV PF',
  'Nike Waffle Racer Crater',
  'Kyrie 7 EP Sisterhood',
  'Nike Air Zoom BB NXT',
  'Nike Air Force 1 07 LX',
  'Nike Air Force 1 Shadow SE',
  'Nike Air Zoom Tempo NEXT%',
  'Nike DBreak-Type',
  'Nike Air Max Up',
  'Nike Air Max 270 React ENG',
  'NikeCourt Royale',
  'Nike Air Zoom Pegasus 37 Premium',
  'Nike Air Zoom SuperRep',
  'NikeCourt Royale',
  'Nike React Art3mis',
  'Nike React Infinity Run Flyknit A.I.R. Chaz Bear'
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107'
];

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    branch: "Textile" ,
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['old', 'new', 'neet', 'iit'])
  };
});


const metadata = fetch('https://apni-coaching-server.herokuapp.com/admin/students', {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.citationstyles.csl+json'
  }
}).json()

let result = [];

// result.push(metadata.data);
// console.log("jhgh");
for(let i = 0 ; i < metadata.data.length ; i += 1){

  let obj = {
    id : metadata.data[i].id ,
    cover: typeof metadata.data[i].url === "undefined" ?  faker.image.image() : metadata.data[i].url,
    name : metadata.data[i].name,
    status : metadata.data[i].batch,
    gender: metadata.data[i].gender,
    email:  metadata.data[i].email,
    contact: metadata.data[i].contact,
    paymentType: metadata.data[i].paymentType,
    scholarNumber : metadata.data[i].scholarNumber,
    payment : metadata.data[i].payment,
    parentName : faker.name.findName(),


  }
  result.push(obj);
}

export default result ;
// export default products;
