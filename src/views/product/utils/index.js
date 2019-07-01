import md5 from "blueimp-md5"

const CREATE_SKU_UNIQUE_ID = sku => {
  let id = "";
  sku.properties.map(property => {
    id += `${property.property_name}_${property.property_value_name}`
  });
  return md5(id);
}

export default CREATE_SKU_UNIQUE_ID