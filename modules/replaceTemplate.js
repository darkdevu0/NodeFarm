module.exports = (single, el) => {
    let output = single
        .replace(/{%PRODUCTNAME%}/g, el.productName)
        .replace(/{%IMAGE%}/g, el.image)
        .replace(/{%FROM%}/g, el.from)
        .replace(/{%NUTRIENTS%}/g, el.nutrients)
        .replace(/{%QUANTITY%}/g, el.quantity)
        .replace(/{%DESCRIPTION%}/g, el.description)
        .replace(/{%PRICE%}/g, el.price)
        .replace(/{%ID%}/g, el.id)
        .replace(/{%NOT_ORGANIC%}/g, !el.organic && "not-organic");
    return output;
};