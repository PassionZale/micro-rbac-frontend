import md5 from "blueimp-md5"

// md5(属性名称_规格名称), 创建唯一 id 字符串, 用以标识此条 sku 唯一属性
const CREATE_SKU_UNIQUE_ID = sku => {
  let id = "";
  let len = sku.properties.length;
  sku.properties.map((property, index) => {
    id += `${property.property_name}_${property.property_value_name}`;
    (index < len - 1) && (id += "_");
  });
  console.log(id);
  return md5(id);
}

// 商品库存校验正则
// 大于或等于 0 的整数
const PATTERN_STOCK = /^(0|([1-9]\d*))$/;

// 商品价格校验正则
// 大于或等于 0 的数字, 且至多保留两位小数点
const PATTERN_PRICE = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/; 

export { CREATE_SKU_UNIQUE_ID, PATTERN_STOCK, PATTERN_PRICE }